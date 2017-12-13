from pygame import surfarray, image, display
import pygame

pygame.init()
image = image.load('image.png')
resolution = (image.get_width(), image.get_height())
screen = display.set_mode(resolution)
screen.blit(image,(0,0))
surfarray.use_arraytype("numpy")
screenpix = surfarray.pixels3d(image)

data = []
data_str = ''
for y in range(resolution[1]):
    for x in range(resolution[0]):
        red = screenpix[x][y][0]
        green = screenpix[x][y][1]
        blue = screenpix[x][y][2] 
        data.append([red / 255.0 , green / 255.0 ,blue / 255.0])
        data_str += str([red / 255.0 , green / 255.0 ,blue / 255.0]) + ',' + '\n'
with open('data.txt', 'w') as f:
    f.write('labels = [' + data_str + ']') #[[1,1,1],[0,0,0],...]