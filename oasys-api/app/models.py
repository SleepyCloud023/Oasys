from app import db


class ImageMetadata(db.Model):
    __tablename__ = 'image_metadata'

    id = db.Column(db.Integer, primary_key=True)
    annotation = db.Column(db.JSON)
    image_url = db.Column(db.String(300))
    image_name = db.Column(db.String(50))
    image_size = db.Column(db.String(30))
    dataset_id = db.Column(db.ForeignKey(
        'dataset.id', onupdate='CASCADE'), index=True)

    dataset = db.relationship(
        'Dataset', primaryjoin='ImageMetadata.dataset_id == Dataset.id', backref='image_metadata')


class Dataset(db.Model):
    __tablename__ = 'dataset'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    user_id = db.Column(db.ForeignKey('user.id'), index=True)
    creation_date = db.Column(db.DateTime)
    modification_date = db.Column(db.DateTime)

    user = db.relationship(
        'User', primaryjoin='Dataset.user_id == User.id', backref='datasets')


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30))
    n_num = db.Column(db.Integer)
