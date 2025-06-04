# coding-take-home

## Overview

This is a relatively simple take home test for us to assess your general knowledge of setting up a basic app.

We are looking for an overall understanding of React, Typescript, and general app design.

The instructions on how to run the application locally is in the README file in the take-home folder.

You are free to add a better file structure, but this task should really only need edits to the files App.tsx, and middleware.ts.

To complete this challenge, please fork this repository and build your own code, then share a link to your version of the repository with some screenshots of the app working locally.

## Task

### Part One

In the mock-data folder, there is a json which is meant to represent an API call from the backend. You are to build a middleware to fetch this data, and conduct some light processing for the front end. 

This should minimally include three key fetch calls

1) Return an array of listings of a particular color or language

2) Return an array of listings of all countries represented in the database

3) Return an array of all listings which have a null value of a particular key like color or language.


### Part Two

Once you have all your fetch calls, you will build a single page application to show the results of these fetch calls in a way that makes the most sense to you. This is a test of not only your understanding of front end development, but a general understanding of UI and UX. We are looking for an app that someone could jump in cold and immediately understand how to use.

This UI should minimally include but is not limited to the following basic features.

- The ability to search and display all listings of a particular color or language.
- A way to visualize each listing grouped by country.
- A way to display the number of listings which does not have data on the searched category.