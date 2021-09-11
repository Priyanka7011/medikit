from django.db import models

# Create your models here.


class Cart(models.Model):
    username = models.CharField(max_length=128)
    cart_json = models.JSONField()
