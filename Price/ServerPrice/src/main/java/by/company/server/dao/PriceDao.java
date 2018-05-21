package by.company.server.dao;

import by.company.server.models.Price;

import java.util.List;

public interface PriceDao {
    List<Price> findAll();
    Price findById(String id);
    Price findByProductId(String productId);
    double getPriceByProductId(String productId);
    void update(Price price);
    void save(Price price);
    void delete(String id);
}
