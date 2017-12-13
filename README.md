![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/cat_example.jpg)

# nn_painting
![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/twitter_example.jpg)
![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/twitter_example2.jpg)
This project uses brain.js - a js library for neural networks - to train a 2x5x5x5x3 feedforward network to paint an image.  
It takes in the x-y coordinates of the image pixels as inputs
and their rgb values as outputs
![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/learning.jpg)

# adaptive learning rate
the learning rate was initially set to 0.3 - which yields good results at the beginning - however, the final image can sometimes revert to a far worse version (with higher error) due to the learning rate overstepping the lowest minima.  
![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/non-adaptive%20learning%20rate.jpg)

Therefore a dynamic learning rate was implemented that progressively decreased as the no. of iterations increased.  This yielded far more accurate results.
![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/adaptive%20learning.jpg)

It was also experimented with setting the learning rate to decrease inline with the error (by a factor of 10) - however, the network trained far more slowly.
![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/learning%20rate%20set%20to%20error.jpg)

# changing the image
![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/ironman_example.jpg)
you can change the default image - but make sure:
it is only 125x125 pixels
it is saved in .png format
it is called "img" 
Then, run the .py file to extract the rgb pixel data for your image for training
Then run index.html and enjoy
![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/cat_learning.jpg)
