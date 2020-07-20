'use strict';

var DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Вася', 'Петя', 'Джон', 'Бот', 'Маша', 'Даша'];
var PHOTOS_COUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 0;
var COMMENTS_MAX = 4;
var AVATARS_MIN = 1;
var AVATARS_MAX = 6;

var getRandomValue = function (from, to) {
  return Math.round(Math.random() * (to - from)) + from;
};

var getRandomElement = function (array) {
  return array[getRandomValue(0, array.length - 1)];
};

var makeComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomValue(AVATARS_MIN, AVATARS_MAX) + '.svg',
    message: getRandomElement(MESSAGES),
    name: getRandomElement(NAMES)
  };
};

var getRandomArray = function (newElement, minLength, maxLength) {
  var outArray = [];
  for (var j = 0; j < getRandomValue(minLength, maxLength); j++) {
    outArray[j] = newElement();
  }
  return outArray;
};

var makePhoto = function (i) {
  return {
    url: 'photos/' + (i + 1) + '.jpg',
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomValue(LIKES_MIN, LIKES_MAX),
    comments: getRandomArray(makeComment, COMMENTS_MIN, COMMENTS_MAX)
  };
};

var getArrayPhotos = function () {
  var arrayObjects = [];
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    arrayObjects[i] = makePhoto(i);
  }
  return arrayObjects;
};

var userPhotos = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture').content;

var createPhoto = function (dataPhoto) {
  var newPhoto = photoTemplate.cloneNode(true);
  newPhoto.querySelector('.picture__img').src = dataPhoto.url;
  newPhoto.querySelector('.picture__comments').textContent = dataPhoto.comments.length;
  newPhoto.querySelector('.picture__likes').textContent = dataPhoto.likes;
  return newPhoto;
};

var renderPhotos = function (arrayPhotos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayPhotos.length; i++) {
    fragment.appendChild(createPhoto(arrayPhotos[i]));
  }
  return fragment;
};

userPhotos.appendChild(renderPhotos(getArrayPhotos()));
