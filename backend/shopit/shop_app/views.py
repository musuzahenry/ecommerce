from django.shortcuts import render
from shop_app.models import Product, Cart, CartItem, Transaction
from rest_framework.decorators import api_view, permission_classes
from shop_app.Serializers import ProductSerializer, DetailProductSerializer, CartItemSerializer, \
     CartSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal
import uuid
from django.conf import settings



# Create your views here.
@api_view(["GET"])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)




@api_view(["GET"])
def product_detail(request, slug):
    product = Product.objects.get(slug=slug)
    serializer = DetailProductSerializer(product)
    return Response(serializer.data)




@api_view(["GET"])
def product_in_cart(request):
    
    cart_code = request.query_params.get("cart_code") 
    product_id = int(request.query_params.get("product_id")) or None
    
    try:
       cart = Cart.objects.get(cart_code = cart_code)
    except:
        cart = None

    try:
       product = Product.objects.get(id = product_id)
    except:
       product = None
    
    if product is None or cart is None:
        product_exists_in_cart = False
    else:
       product_exists_in_cart = CartItem.objects.filter(cart = cart, product = product).exists()
    
    return Response({"product_exists_in_cart":product_exists_in_cart})




@api_view(["POST"])
def add_item(request):

    cart_code = request.data.get("cart_code")
    product_id = request.data.get("product_id")
    
    user = request.user or None

    try:
        cart, created= Cart.objects.get_or_create(cart_code = cart_code, user = user)
        product = Product.objects.get(id = product_id)

        cartItem, created= CartItem.objects.get_or_create(cart = cart, product = product)
        cartItem.quantity = 1
        cartItem.save()

        serializer = CartItemSerializer(cartItem) #convert this item to JSON


        if created: 
            message = "Cart item added succcessfully"          
        else:
           #created is false of cat item was already in database
           message = "Sorry, item already in cart"
           
        
        return Response({"data":serializer.data, "message":message, "inCart":created})
    except Exception as e:
        return Response({"Error": str(e)}, status = 400)
    



@api_view(["GET"])
def get_cart(request):
    cart_code = request.query_params.get("cart-code")
    user = request.user or None
    cart = Cart.objects.get(cart_code = cart_code, paid = False)

    #assign this cart to this use
    cart.user = user
    cart.save()

    serializer = CartSerializer(cart)
    return Response(serializer.data)




@api_view(["PATCH"])
def update_cart(request):
    try:
        cartIrem_id = int(request.data.get("item_id"))
        quantity = int(request.data.get("quantity"))
        cartItem = CartItem.objects.get(id = cartIrem_id)
        cartItem.quantity = quantity
        cartItem.save()
        serializer = CartItemSerializer(cartItem)
        return Response({"data":serializer.data, "message":"Cart item successfully updated"})
    except ExceptionGroup as e:
      return Response({"error":str(e)}, status = 400)




@api_view(["DELETE"])
def delete_cartitem(request, pk):

    cartitem_id = int(pk)    
    cartitem = CartItem.objects.get(id = cartitem_id)
    cartitem.delete()
    return Response({"message":"Item deleted successfully"}, status = status.HTTP_204_NO_CONTENT)




@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_username(request):
    user = request.user
    return Response({"username":user.username})



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_items(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


