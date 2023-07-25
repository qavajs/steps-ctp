Feature: Actions

  Scenario: CRUD customer
    When I create new Customer with email 'test@wefff.com' and password 'Automate1234!' and save data 'customer'
    And I add address '$dataFile("../test-data/address")' to the customer '$customer' account
    And I get '$customer' customer and save details 'updatedCustomer'
    And I delete '$updatedCustomer' customer


