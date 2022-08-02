resource "commercetools_type" "custom-lineItem" {
  key = "custom-lineItem"
  name = {
    en = "Custom line item"
  }

  resource_type_ids = ["line-item"]

  field {
    name = "warranty"
    label = {
      en = "Warranty"
    }
    type {
      name = "String"
    }
  }
}

resource "commercetools_type" "custom-cart" {
  key = "custom-cart"
  name = {
    en = "Custom cart"
  }

  resource_type_ids = ["order"]

  field {
    name = "custom-fields"
    label = {
      en = "Custom Fields"
    }
    type {
      name = "Set"
      element_type {
        name = "String"
      }
    }
  }

}

resource "commercetools_type" "relative-discounts" {
  key = "relative-discounts"
  name = {
    en = "Relative Discounts"
  }
  description = {
    en = "Discounts which subtract some percent of the targets' prices"
  }

  resource_type_ids = ["cart-discount"]

  field {
    name = "discounts"
    label = {
      en = "Discounts"
    }
    type {
      name = "Set"
      element_type {
        name = "String"
      }
    }
  }

  field {
    name = "triggers"
    label = {
      en = "Triggers"
    }
    type {
      name = "String"
    }
  }
}
