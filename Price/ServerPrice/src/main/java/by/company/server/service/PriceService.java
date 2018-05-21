package by.company.server.service;

import by.company.server.dao.PriceDao;
import by.company.server.models.Price;
import com.mongodb.Block;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;

import javax.jws.WebService;
import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Updates.combine;
import static com.mongodb.client.model.Updates.set;

@WebService
public class PriceService implements PriceDao {

    private MongoClient mongo = MongoClients.create();
    private MongoDatabase db = mongo.getDatabase("product_price");
    private MongoCollection<Document> collection = db.getCollection("prices");

    @Override
    public List<Price> findAll() {
        List<Price> prices = new ArrayList<>();
        collection.find().forEach((Block<Document>) document -> prices.add(
                Price.builder()
                .id(document.getObjectId("_id").toString())
                .price(document.getDouble("price"))
                .productId(document.getString("productId"))
                .build()));
        return prices;
    }

    @Override
    public Price findById(String id) {
        Price[] price = new Price[1];
        ObjectId objectId = new ObjectId(id);
        collection.find(eq("_id", objectId)).forEach(
                (Block<Document>) document -> price[0] = Price.builder()
                .id(document.getObjectId("_id").toString())
                .productId(document.getString("productId"))
                .price(document.getDouble("price"))
                .build());
        return price[0];
    }

    @Override
    public Price findByProductId(String productId) {
        Price[] price = new Price[1];
        collection.find(eq("productId", productId)).forEach(
                (Block<Document>) document -> price[0] = Price.builder()
                .id(document.getObjectId("_id").toString())
                .productId(document.getString("productId"))
                .price(document.getDouble("price"))
                .build());
        return price[0];
    }

    @Override
    public double getPriceByProductId(String productId) {
        double[] price = new double[] {0};
        collection.find(eq("productId", productId)).forEach(
                (Block<Document>) document -> price[0] = document.getDouble("price"));
        return price[0];
    }

    @Override
    public void update(Price price) {
        ObjectId objectId = new ObjectId(price.getId());
        collection.updateOne(
                eq("_id", objectId),
                combine(set("price", price.getPrice()), set("productId",price.getProductId())));
    }

    @Override
    public void save(Price price) {
        Document saveDocument = new Document();
        saveDocument.append("price", price.getPrice());
        saveDocument.append("productId", price.getProductId());
        collection.insertOne(saveDocument);
    }

    @Override
    public void delete(String id) {
        ObjectId objectId = new ObjectId(id);
        collection.deleteOne(eq("_id", objectId));
    }
}
