angular-prismic [![Build Status](https://travis-ci.org/kennethlynne/angular-prismic.png?branch=master)](https://travis-ci.org/kennethlynne/angular-prismic)
===============
**Work in progress. Feel free to contribute with pull requests and feature requests.**

Prismic.io Angular provider to abstract prismic.io API interaction.
It is tested, it uses promises for all interaction with the API and it uses `$http` behind the scenes, allowing you to provide mock data, test and interact in a familiar way.

* Web site: http://prismic.io
* Tutorial: https://developers.prismic.io/technologies/UjBh28uvzeMJvE4i/javascript
* API Docs: https://developers.prismic.io/documentation/UjBe8bGIJ3EKtgBZ/api-documentation
* Developer Guide: https://developers.prismic.io/
* Contribution guidelines: https://github.com/kennethlynne/angular-prismic/blob/master/CONTRIBUTING.md

Building angular-prismic
---------
[Once you have your environment setup](https://github.com/kennethlynne/angular-prismic/blob/master/CONTRIBUTING.md) just run:

    grunt package


Running Tests
-------------
To execute all unit tests, use:

    grunt test:unit

To execute end-to-end (e2e) tests, use:

    grunt package
    grunt test:e2e

To learn more about the grunt tasks, run `grunt --help` and also read our
[contribution guidelines](https://github.com/kennethlynne/angular-prismic/blob/master/CONTRIBUTING.md).

The MIT License (MIT)

Copyright (c) 2014 Kenneth Lynne

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[![Analytics](https://ga-beacon.appspot.com/UA-46835353-1/angular-prismic/README)](https://github.com/igrigorik/ga-beacon)