from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import json
from django import http
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.db import IntegrityError
from .models import User
from django.views.decorators.csrf import csrf_exempt



# Create your views here.

def index(request):

#    if request.user.is_authenticated:
        return render(request, "AllergoBuster5000/index.html")
#    else:
        return HttpResponseRedirect(reverse("login"))

@csrf_exempt
#@login_required
def saveData(request):
    # Composing a new email must be via POST
    pollenDict = { "Abies": 0, "Acer": 0, "Aesculus": 0, "Alnus": 0, "Ambrosia": 0, "Artemisia": 0, "Asteraceae": 0, "Betula": 0, "Carpinus": 0, "Castanea": 0, "Chenopodium": 0, "Corylus": 0, "Cruciferae": 0, "Cyperaceae": 0, "Erica": 0, "Fagus": 0, "Fraxinus": 0, "Fungus": 0, "Galium": 0, "Humulus": 0, "Impatiens": 0, "Juglans": 0, "Larix": 0, "Picea": 0, "Pinaceae": 0, "Pinus": 0, "Plantago": 0, "Platanus": 0, "Poaceae": 0, "Populus": 0, "Quercus": 0, "Quercus ilex": 0, "Rumex": 0, "Salix": 0, "Sambucus": 0, "Secale": 0, "Taxus": 0, "Tilia": 0, "Ulmus": 0, "Urtica": 0, "Varia": 0 }

    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    # Check recipient emails
    print("Guten TagS")
    data = json.loads(request.body)
    for x in pollenDict:
        for y in data:
            if (x == y["name"]):
                pollenDict[x] = y["measure"]
    
#    for x in pollenDict:
#        print(x)
#        print(pollenDict[x])

#    for x in data:
 #       print(x["name"])
  #      print(x["measure"])

    return JsonResponse({"none": "POST arrived."}, status=200)


#---------------------------------------------------------------

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "AllergoBuster5000/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "AllergoBuster5000/login.html")

@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "AllergoBuster5000/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "AllergoBuster5000/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "AllergoBuster5000/register.html")
