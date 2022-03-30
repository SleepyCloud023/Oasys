# coding: utf-8
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()



class Dataset(db.Model):
    __tablename__ = 'dataset'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    user_id = db.Column(db.ForeignKey('user.id'), index=True)
    creation_date = db.Column(db.DateTime)
    modification_date = db.Column(db.DateTime)
    rep_image = db.Column(db.String(300))

    user = db.relationship('User', primaryjoin='Dataset.user_id == User.id', backref='datasets')



class ImageMetadatum(db.Model):
    __tablename__ = 'image_metadata'

    id = db.Column(db.Integer, primary_key=True)
    annotation = db.Column(db.JSON)
    image_url = db.Column(db.String(300))
    image_name = db.Column(db.String(50))
    image_size = db.Column(db.String(30))
    dataset_id = db.Column(db.ForeignKey('dataset.id', onupdate='CASCADE'), index=True)
    size = db.Column(db.String(20))
    creation_date = db.Column(db.DateTime)
    modification_date = db.Column(db.DateTime)

    dataset = db.relationship('Dataset', primaryjoin='ImageMetadatum.dataset_id == Dataset.id', backref='image_metadata')



class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30))
    login_id = db.Column(db.String(30))
    login_password = db.Column(db.String(30))
    email = db.Column(db.String(30))
