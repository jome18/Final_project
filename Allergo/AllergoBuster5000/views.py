from django.db.models.fields import PositiveSmallIntegerField
from django.forms.models import model_to_dict
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django import http
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from .models import *
from django.db import IntegrityError
from datetime import datetime


# Create your views here.

def index(request):

#    if request.user.is_authenticated:
        return render(request, "AllergoBuster5000/index.html")
#    else:
#        return HttpResponseRedirect(reverse("login"))

@csrf_exempt
@login_required
def myPollen(request):
    feelingArr = ["SS", "SC", "NM", "GT", "SG"]
    pollenDictDict = {}
 #   pollenDictArr = []
    for e in feelingArr:        
        pollenDict = {"feeling": "", "Abies": 0, "Acer": 0, "Aesculus": 0, "Alnus": 0, "Ambrosia": 0, "Artemisia": 0, "Asteraceae": 0, "Betula": 0, "Carpinus": 0, "Castanea": 0, "Chenopodium": 0, "Corylus": 0, "Cruciferae": 0, "Cyperaceae": 0, "Erica": 0, "Fagus": 0, "Fraxinus": 0, "Fungus": 0, "Galium": 0, "Humulus": 0, "Impatiens": 0, "Juglans": 0, "Larix": 0, "Picea": 0, "Pinaceae": 0, "Pinus": 0, "Plantago": 0, "Platanus": 0, "Poaceae": 0, "Populus": 0, "Quercus": 0, "Quercus_ilex": 0, "Rumex": 0, "Salix": 0, "Sambucus": 0, "Secale": 0, "Taxus": 0, "Tilia": 0, "Ulmus": 0, "Urtica": 0, "Varia": 0 }
        data = Tagebuch.objects.filter(user=request.user, feeling=e)
        for i in data:
            for j in i.__dict__:
                l = 1
                for k in pollenDict:
                    if (k == j):
                        if (l > 1):
                            pollenDict[k] = (pollenDict[k] + i.__dict__[j]) / 2
                        else:
                            pollenDict[k] = (pollenDict[k] + i.__dict__[j])
                        l = l + 1
        if (pollenDict["feeling"] != ""):
            pollenDict["feeling"] = e
            pollenDictDict[e] = pollenDict.copy()
        pollenDict.clear()
    return JsonResponse(pollenDictDict)        
#    return render(request, "AllergoBuster5000/myPollen.html")



@csrf_exempt
@login_required
def saveData(request):
    pollenDict = {"feeling": "NM", "Abies": 0, "Acer": 0, "Aesculus": 0, "Alnus": 0, "Ambrosia": 0, "Artemisia": 0, "Asteraceae": 0, "Betula": 0, "Carpinus": 0, "Castanea": 0, "Chenopodium": 0, "Corylus": 0, "Cruciferae": 0, "Cyperaceae": 0, "Erica": 0, "Fagus": 0, "Fraxinus": 0, "Fungus": 0, "Galium": 0, "Humulus": 0, "Impatiens": 0, "Juglans": 0, "Larix": 0, "Picea": 0, "Pinaceae": 0, "Pinus": 0, "Plantago": 0, "Platanus": 0, "Poaceae": 0, "Populus": 0, "Quercus": 0, "Quercus_ilex": 0, "Rumex": 0, "Salix": 0, "Sambucus": 0, "Secale": 0, "Taxus": 0, "Tilia": 0, "Ulmus": 0, "Urtica": 0, "Varia": 0 }

    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    
    data = json.loads(request.body)
    for x in pollenDict:
        for y in data:
            if (x == y["name"]):
                pollenDict[x] = y["measure"]
    
    for y in data:
        if (y["name"] == "Quercus ilex"):
            pollenDict["Quercus_ilex"] = y["measure"]
    print(pollenDict["Quercus_ilex"])

    if (Tagebuch.objects.filter(user=request.user, date_stamp=datetime.now()).order_by("-datetime_stamp").first()):
        getUserTagebuch = Tagebuch.objects.filter(user=request.user, date_stamp=datetime.now()).order_by("-datetime_stamp").first()
    else:
        getUserTagebuch = Tagebuch.objects.create(user=request.user, date_stamp=datetime.now())
    for k in pollenDict.keys():
        setattr(getUserTagebuch, k, pollenDict[k])
    getUserTagebuch.save()
#    test = Tagebuch.objects.filter(user=request.user, date_stamp=datetime.now()).order_by("-datetime_stamp").first()
#    print(test.feeling)
    return JsonResponse({"Message": "Data Saved"}, status=200)


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
        #return render("index")
    else:
        return render(request, "AllergoBuster5000/register.html")
