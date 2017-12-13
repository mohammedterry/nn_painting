# nn_painting

This project uses brain.js - a js library for neural networks - to train a 2x5x5x5x3 feedforward network to paint an image.  
It takes in the x-y coordinates of the image pixels as inputs
and their rgb values as outputs
![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/learning.jpg)

# adaptive learning rate
the learning rate was initially set to 0.3 - which yields good results at the beginning - however, the final image can sometimes revert to a far worse version (with higher error) due to the learning rate overstepping the lowest minima.  
![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/non-adaptive%20learning%20rate.jpg)
![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/non-adaptive%20learning.jpg)


Therefore a dynamic learning rate was implemented that progressively decreased as the no. of iterations increased.  This yielded far more accurate results.
![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/adaptive%20learning.jpg)

It was also experimented with setting the learning rate to decrease inline with the error (by a factor of 10) - however, the network trained far more slowly.
![](https://raw.githubusercontent.com/mohammedterry/nn_painting/master/screenshots/learning%20rate%20set%20to%20error.jpg)
