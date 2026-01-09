from django.urls import path
from shop_app import views


urlpatterns = [
    path("products", views.products, name="products"),
    path("product-detail/<slug:slug>", views.product_detail, name="product-detail"),
    path("add-item", views.add_item, name= "add-item"),
    path("product-in-cart", views.product_in_cart, name="product-in-cart"),
    path("get-cart", views.get_cart, name="get-cart"),
    path("update-cart/", views.update_cart, name="update-cart"),
    path("delete-cartitem/<int:pk>", views.delete_cartitem, name="delete-cartitem"),
    path("get-username", views.get_username, name = "get-username"),
    path("user-items", views.user_items, name="user-items"),
]
