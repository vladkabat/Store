package by.company.client;

import java.util.Scanner;

public class Application {

    public static void main(String[] args) {
        Client clientService = new Client();
        Scanner scanner = new Scanner(System.in);
        while(true){
            System.out.println("\n1 - Add price");
            System.out.println("2 - Delete price");
            System.out.println("3 - Update price");
            System.out.println("4 - Get prices");
            System.out.println("5 - Get price by ID");
            System.out.println("6 - Get price by PRODUCT ID");
            System.out.println("7 - Close");
            System.out.println("\n Enter value: ");
            int value = scanner.nextInt();
            if(value == 1){
                clientService.save();
            } else if(value == 2){
                clientService.delete();
            } else if(value == 3){
                clientService.update();
            } else if(value == 4){
                clientService.findAll();
            } else if(value == 5){
                clientService.findById();
            } else if(value == 6){
                clientService.findByProductId();
            } else if(value == 7){
                break;
            }
        }
    }
}
