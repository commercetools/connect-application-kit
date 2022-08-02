# https://github.com/labd/terraform-provider-commercetools
# This plugin must be manually installed
#provider "commercetools" {
#  client_id     = var.CT_CLIENT_ID
#  client_secret = var.CT_CLIENT_SECRET
#  project_key   = var.CT_PROJECT_KEY
#  token_url     = var.CT_AUTH_URL
#  api_url       = var.CT_API_URL
#  scopes        = var.CT_SCOPES
#}
terraform {
  required_providers {
    commercetools = {
      source = "labd/commercetools"
    }
  }
}

provider "google" {
  project = var.GCP_PROJECT_ID
  region = var.GCP_REGION
}
