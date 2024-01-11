
## idea
I want to make a game similar to the old "Moorhuhn" (english "Red Grouse" or "Crazy Chicken") shoot-'em-up that I played a lot as a kid. The game is about shooting as many "Red Grouse" as you can within a time frame of 90 seconds. The targets fly across the screen and they have different sizes. The smallest ones are harder to shoot (25 points) than the biggest ones (5 points). You shoot with a left click and you need to reload - latest after 8 shots - with a right click.

My idea is a simple clone of the game in which you do not shoot at animals but throw darts at broccolis. More precisely not at broccolis, but at balloons that carry the broccolis up into the sky. When you hit a balloon, the broccoli should fall down to earth and continue growing to brocco-bloom the desert.

## name
The Harvest

## general mechanics

- there are constalty broccolis on balloons (broccoloons) rising up to the sky (spawning) at random positions and times
- you have X seconds to save as many broccoli as you can by throwing darts at the balloons (countdown timer)
- when you hit a balloon, it explodes and the broccoli falls down to earth and stops there ("grows in the ground")

- you can make a high score (win very well)
- you have 8 darts to throw before you need to reload

- if you hit a balloon, you get ++ points (reward)
- if you hit a broccoli, you get -- points (penalty)
- if a balloon vanishes at the top, you get -- points (penalty)
- more points for smaller balloons, less points for bigger balloons
- bonus balloon that is harder to burst, but gives lots of points

## MVP

- starting window with explaination, story and start button
- game window with game container
- end window with resume of performance and highscore list

- left click = throw a dart
- press 'a' = reload, delay

- countdown timer is displayed on screen
- counter for score is displayed on screen

- blocks of "stacked div pairs" (broccoloons) rise up the window
- upper div = balloon, bottom div = broccoli
- random spawning of broccoloons: time, location, size

- mouse cursor is an aiming cross
- image of balloon as upper div
- image of broccoli as bottom div
- background image: a simple landscape of desert

## Extras

- images for available darts displayed on screen, flipped to grey if thrown
- sounds – throw a dart, balloon explodes, broccoli hits the ground, reloading
- bonus target appearing at random times that needs to be hit more often
- show stats after game over
- make a user input for player name and a updating highscore list