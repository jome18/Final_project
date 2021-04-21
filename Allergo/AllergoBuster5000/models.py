from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User (AbstractUser):
    pass


class Tagebuch(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="pollenDaten")
    datetime_stamp = models.DateTimeField(auto_now_add=True)
    date_stamp = models.DateField(auto_now_add=True)
    Abies = models.FloatField(max_length=20, default=0)
    Acer = models.FloatField(max_length=20, default=0)
    Aesculus = models.FloatField(max_length=20, default=0)
    Alnus = models.FloatField(max_length=20, default=0)
    Ambrosia = models.FloatField(max_length=20, default=0)
    Artemisia = models.FloatField(max_length=20, default=0)
    Asteraceae = models.FloatField(max_length=20, default=0)
    Betula = models.FloatField(max_length=20, default=0)
    Carpinus = models.FloatField(max_length=20, default=0)
    Castanea = models.FloatField(max_length=20, default=0)
    Chenopodium = models.FloatField(max_length=20, default=0)
    Corylus = models.FloatField(max_length=20, default=0)
    Cruciferae = models.FloatField(max_length=20, default=0)
    Cyperaceae = models.FloatField(max_length=20, default=0)
    Erica = models.FloatField(max_length=20, default=0)
    Fagus = models.FloatField(max_length=20, default=0)
    Fraxinus = models.FloatField(max_length=20, default=0)
    Fungus = models.FloatField(max_length=20, default=0)
    Galium = models.FloatField(max_length=20, default=0)
    Humulus = models.FloatField(max_length=20, default=0)
    Impatiens = models.FloatField(max_length=20, default=0)
    Juglans = models.FloatField(max_length=20, default=0)
    Larix = models.FloatField(max_length=20, default=0)
    Picea = models.FloatField(max_length=20, default=0)
    Pinaceae = models.FloatField(max_length=20, default=0)
    Pinus = models.FloatField(max_length=20, default=0)
    Plantago = models.FloatField(max_length=20, default=0)
    Platanus = models.FloatField(max_length=20, default=0)
    Poaceae = models.FloatField(max_length=20, default=0)
    Populus = models.FloatField(max_length=20, default=0)
    Quercus = models.FloatField(max_length=20, default=0)
    Quercus_ilex = models.FloatField(max_length=20, default=0)
    Rumex = models.FloatField(max_length=20, default=0)
    Salix = models.FloatField(max_length=20, default=0)
    Sambucus = models.FloatField(max_length=20, default=0)
    Secale = models.FloatField(max_length=20, default=0)
    Taxus = models.FloatField(max_length=20, default=0)
    Tilia = models.FloatField(max_length=20, default=0)
    Ulmus = models.FloatField(max_length=20, default=0)
    Urtica = models.FloatField(max_length=20, default=0)
    Varia = models.FloatField(max_length=20, default=0)    


def __str__(self):
		return f"{self.Abies}, {self.Acer}, {self.Aesculus}, {self.Alnus}, {self.Ambrosia}, {self.Artemisia}, {self.Asteraceae}, {self.Betula}, {self.Carpinus}, {self.Castanea}, {self.Chenopodium}, {self.Corylus}, {self.Cruciferae}, {self.Cyperaceae}, {self.Erica}, {self.Fagus}, {self.Fraxinus}, {self.Fungus}, {self.Galium}, {self.Humulus}, {self.Impatiens}, {self.Juglans}, {self.Larix}, {self.Picea}, {self.Pinaceae}, {self.Pinus}, {self.Plantago}, {self.Platanus}, {self.Poaceae}, {self.Populus}, {self.Quercus}, {self.Quercus_ilex}, {self.Rumex}, {self.Salix}, {self.Sambucus}, {self.Secale}, {self.Taxus}, {self.Tilia}, {self.Ulmus}, {self.Urtica}, {self.Varia}"