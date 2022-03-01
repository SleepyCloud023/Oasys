from app4 import db


class AnnotationObject(db.Model):
    __tablename__ = 'annotation_object'

    id = db.Column(db.Integer, primary_key=True)
    annotation = db.Column(db.JSON)
    image_url = db.Column(db.String(300))
    image_name = db.Column(db.String(50))
    image_size = db.Column(db.String(30))
    dataset_id = db.Column(db.ForeignKey(
        'dataset.id', onupdate='CASCADE'), index=True)

    dataset = db.relationship(
        'Dataset', primaryjoin='AnnotationObject.dataset_id == Dataset.id', backref='annotation_objects')


class Dataset(db.Model):
    __tablename__ = 'dataset'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30))
    n_num = db.Column(db.Integer)
