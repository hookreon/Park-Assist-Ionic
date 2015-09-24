# Park Assist

> Mobile application for real-time parking recommendations for meters in Santa Monica.

## Team

  - __Product Owner__: Spencer Miller
  - __Scrum Master__: Erik Eppel
  - __Development Team Members__: Phil Keys and Kamron Batman

## Table of Contents

1. [Team](#Team)
1. [Road Map](#Roadmap)
1. [Usage](#Usage)
1. [Requirements](#Requirements)
1. [Development](#Development)
    1. [Installing Dependencies](#Installing-dependencies)
1. [Contributing](#Contributing)

### Roadmap

> [Park Assist](https://parkassist.herokuapp.com/) began as a desktop application in need of a mobile version on a tight deadline. Our team was tasked with taking the legacy codebase and porting to mobile. Given that the original web application was written in AngularJS, we decided to use Ionic for its compatibility with original source code. 

> The switch to mobile required an overhaul of the UI. Below is the a screengrab of the original UI:
<img src="/readme-assets/park-assist-original-ui.jpg" height="400">

Below is the updated mobile UI:

<img src="/readme-assets/Park_Assist.gif" height="500">

## Usage

> Before working in `Park-Assist-Ionic`, look over the README files in `dbScrape` and `splendid-simi-dev`. These folder contain information about servers that support the mobile application, and the project won't work without these servers running.

## Requirements

#### Splendid Simi Dev
* [AngularJS](https://angularjs.org/)
* [Firebase](https://www.firebase.com/)
* [Node.js](https://nodejs.org/)
* [Express](http://expressjs.com/)
* [Google Maps APIs](https://developers.google.com/maps/?hl=en/)
* [City of Santa Monica Parking Data API](https://parking.api.smgov.net/)

#### Park Assist Ionic
* [Ionic](http://ionicframework.com/)
* [ngCordova](http://ngcordova.com/)

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```


## Contributing

See [CONTRIBUTING.md](https://github.com/unexpected-lion/ourglass/blob/master/contributing.md) for contribution guidelines.
