package by.company.client;

import by.company.service.Price;
import by.company.service.PriceService;
import by.company.service.PriceServiceService;

import java.util.List;
import java.util.Scanner;

class Client {

    private Scanner scanner;
    private PriceService priceService;

    Client(){
        scanner = new Scanner(System.in);
        priceService = new PriceServiceService().getPriceServicePort();
    }

    void update(){
        System.out.println("Price id: ");
        String priceId = scanner.next();
        Price price = priceService.findById(priceId);
        //update product id
        System.out.println("Update product id (y/n): ");
        String updateProductId = scanner.next();
        if(updateProductId.equals("y")){
            System.out.printf("Product id: ");
            price.setProductId(scanner.next());
        }
        //update price
        System.out.println("Update price (y/n): ");
        String updatePrice = scanner.next();
        if(updatePrice.equals("y")){
            System.out.printf("Price: ");
            price.setPrice(scanner.nextDouble());
        }
        priceService.update(price);
    }

    void save(){
        Price price = new Price();
        System.out.println("Product id: ");
        String productId = scanner.next();
        price.setProductId(productId);
        System.out.println("Price: ");
        double priceValue = scanner.nextDouble();
        price.setPrice(priceValue);
        priceService.save(price);
    }

    void delete(){
        System.out.println("Price id: ");
        String priceId = scanner.next();
        priceService.delete(priceId);
    }

    void findAll(){
        List<Price> priceList = priceService.findAll();
        for(Price price : priceList) {
            outputPrice(price);
        }
    }

    void findById(){
        System.out.println("Price id: ");
        String priceId = scanner.next();
        Price price = priceService.findById(priceId);
        if(price != null) {
            outputPrice(price);
        }
    }

     void findByProductId(){
         System.out.println("Product id: ");
         String productId = scanner.next();
         Price price = priceService.findByProductId(productId);
         if(price != null) {
             outputPrice(price);
         }
    }

    private void outputPrice(Price price){
        System.out.println(price.getId() + " " + price.getProductId() + " " + price.getPrice());
    }
}
