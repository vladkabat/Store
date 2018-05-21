package by.company.store.controllers;

import by.company.store.enums.OrderStatus;
import by.company.store.enums.ProductType;
import by.company.store.models.Order;
import by.company.store.models.User;
import by.company.store.models.products.Product;
import by.company.store.services.OrderService;
import by.company.store.services.products.PhoneService;
import by.company.store.services.products.TabletService;
import by.company.store.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Secured("ROLE_CUSTOMER")
@RequestMapping("purchases")
public class PurchaseRestController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final OrderService orderService;
    private final PhoneService phoneService;
    private final TvService tvService;
    private final TabletService tabletService;
    private final VideoCameraService videoCameraService;

    @Autowired
    public PurchaseRestController(OrderService orderService, PhoneService phoneService,
                                  TvService tvService, TabletService tabletService,
                                  VideoCameraService videoCameraService) {
        this.orderService = orderService;
        this.phoneService = phoneService;
        this.tvService = tvService;
        this.tabletService = tabletService;
        this.videoCameraService = videoCameraService;
    }

    @GetMapping()
    public ResponseEntity getPurchases() {
        String userId = getCustomerId();
        List<Order> purchases = orderService.findBoughtOrders(userId);
        if (purchases.isEmpty()) {
            logger.info("Purchases is empty!");
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        logger.info("User get '{}' purchases!", purchases.size());
        return new ResponseEntity<>(purchases, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity deletePurchase(@PathVariable String id) {
        String userId = getCustomerId();
        Order order = orderService.findById(id);
        if (order == null) {
            String message = "Purchase " + id + " not found!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        } else {
            if (userId.equals(order.getUserId())) {
                orderService.deleteById(id);
                logger.info("Purchase {} is deleted!", id);
                return new ResponseEntity(HttpStatus.OK);
            } else {
                String message = "No permission to delete!";
                logger.error(message);
                return new ResponseEntity<>(CustomErrorType.builder()
                        .errorMessage(message).build(), HttpStatus.FORBIDDEN);
            }
        }
    }

    @PostMapping()
    public ResponseEntity postPurchase(@RequestBody List<Order> orders) {
        for (Order order : orders) {
            if (orderService.findById(order.getId()) == null) {
                String message = "Order " + order.getId() + " not found!";
                logger.error(message);
                return new ResponseEntity<>(CustomErrorType.builder()
                        .errorMessage(message).build(), HttpStatus.NOT_FOUND);
            }

            Product product = order.getProduct();
            boolean isUpdateAmount = false;
            if (product.getType().equals(ProductType.TABLET)) {
                isUpdateAmount = tabletService.updateAmountMinus(product.getId(), order.getAmount());
            } else if (product.getType().equals(ProductType.PHONE)) {
                isUpdateAmount = phoneService.updateAmountMinus(product.getId(), order.getAmount());
            } else if (product.getType().equals(ProductType.TV)) {
                isUpdateAmount = tvService.updateAmountMinus(product.getId(), order.getAmount());
            } else if (product.getType().equals(ProductType.VIDEO_CAMERA)) {
                isUpdateAmount = videoCameraService.updateAmountMinus(product.getId(), order.getAmount());
            }
            if (!isUpdateAmount) {
                String message = "Count products not equals specified!";
                logger.error(message);
                return new ResponseEntity<>(CustomErrorType.builder()
                        .errorMessage(message).build(), HttpStatus.CONFLICT);
            }

            addPurchase(order);
        }
        logger.info("Purchase is saved!");
        return new ResponseEntity(HttpStatus.CREATED);
    }

    private void addPurchase(Order order) {
        String userId = getCustomerId();
        Order purchase = orderService.findBoughtOrderByProductIdAndUserId(order.getProduct().getId(), userId);
        if (purchase == null) {
            order.setStatus(OrderStatus.BOUGHT);
            orderService.save(order);
        } else {
            purchase.setAmount(purchase.getAmount() + order.getAmount());
            orderService.deleteById(order.getId());
            orderService.update(purchase);
        }
    }

    private String getCustomerId() {
        return ((User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal())
                .getId();
    }
}
