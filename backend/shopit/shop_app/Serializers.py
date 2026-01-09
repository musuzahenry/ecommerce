from rest_framework import serializers
from shop_app.models import Product, Cart, CartItem
from django.contrib.auth import get_user_model


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "image", "description", "price", "category",]




class DetailProductSerializer(serializers.ModelSerializer):
    similar_products = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "image", "description", "price", "category", "similar_products"]
    
    def get_similar_products(self, product):
        products = Product.objects.filter(category = product.category).exclude(id = product.id)
        serializer = ProductSerializer(products, many = True)
        return serializer.data
    


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only = True)
    total = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = ["id", "product","quantity", "total"]
    
    def get_total(self, cartitem):
         return int(cartitem.quantity) * cartitem.product.price
    

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only=True, many=True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ["id","cart_code", "items", "sum_total", "num_of_items", "created_at","modified_at"]

    def get_sum_total(self, cart):
            items = cart.items.all()
            total = sum([item.product.price * item.quantity for item in items])
            return total
        
    def get_num_of_items(self, cart):
            items = cart.items.all()
            num_items = sum([item.quantity for item in items])
            return num_items
            




class SimpleCartSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ["id","cart_code", "num_of_items"]

    def get_num_of_items(self, cart):
        num_of_items = sum([item.quantity for item in (cart.items.all())])
        return num_of_items
    



class UserSerializer(serializers.ModelSerializer):
     class Meta:
          model = get_user_model()
          fields = ['id', 'username', 'first_name', 'last_name', 'address', 'email', 'city', 'state', 'phone']


