package by.company.server;

import by.company.server.service.PriceService;

import javax.xml.ws.Endpoint;

public class Application {
    public static void main(String[] args) {
        String address = "http://localhost:9001/PriceService";
        Endpoint.publish(address, new PriceService());
    }
}
