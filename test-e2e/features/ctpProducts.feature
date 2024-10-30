Feature: actions

  Scenario: Get Products
    When I save "200" products from ctp as "products"
    Then I expect ctp products "$products" contains "abc"
    Then I create new Product with "$dataFile('../test-data/product')" data and save it as "product"
    And I add "3" quantity in stock for "$product" product
    Then I unpublish "$product" product
    And I delete "$product" product
