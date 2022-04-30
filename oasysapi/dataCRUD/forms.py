from django import forms


class ImgForm(forms.Form):
    title = forms.CharField(max_length=250)
    file = forms.ImageField()
