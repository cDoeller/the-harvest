
## idea
I want to make a game similar to the old "Moorhuhn" (english "Red Grouse" or "Crazy Chicken") shoot-'em-up that I played a lot as a kid. The game is about shooting as many "Red Grouse" as you can within a time frame of 90 seconds. The targets fly across the screen and they have different sizes. The smallest ones are harder to shoot (25 points) than the biggest ones (5 points). You shoot with a left click and you need to reload - latest after 8 shots - with a right click.

My idea is a simple clone of the game in which you do not shoot at animals but throw darts at broccolis. More precisely not at broccolis, but at balloons that carry the broccolis up into the sky. When you hit a balloon, the broccoli should fall down to earth and continue growing to brocco-bloom the desert.

## name
The Harvest

## general structure

- there are constalty broccolis on balloons (broccoloons) rising up to the sky (spawning) at random positions and times
- you have 90 seconds to save as many broccoli as you can by throwing darts at the balloons (countdown timer)
- when you hit a balloon, it explodes and the broccoli falls down to earth and stops there

- you can make a high score (win)
- you can't have less than 0 points (lose) 
- extra: you have 8 darts to throw before you need to get a new box of darts (reloading)

- if you hit a balloon, you get + points (reward)
- if you hit a broccoli, you get - points (penalty)
- extra: more points for smaller balloons, less points for bigger balloons

## mechanisms

- starting window with explaination, story and start button
- game window with game container
- game end window with resume of performance

- left click = throw a dart
- extra: right click = reload, delay
- extra: no throwing after 8 throws

- countdown timer 90 seconds
- countdown timer is displayed on screen
- game always ends after 90 seconds

- blocks of "stacked div pairs" (broccoloons) rise up the window
- upper div = balloon, bottom div = broccoli
- random spawning of broccoloons: time, location, size

- counter for points
- counter + for hit balloons
- extra: counter - for hit broccolis

- mouse cursor is an aiming cross
- image of balloon as upper div
- image of broccoli as bottom div
- background image: a simple landscape, post apocalyptic nature scenery
- extra: image for available darts, flipped to grey if thrown

- extra: sounds – throw a dart, balloon explodes, broccoli hits the ground, reloading

## MVP

1. logic for starting game
2. creating one target
4. shooting target
3. creating multiple targets
5. what makes the animation look the way it does (setInterval / requestnAimationFrame)
5. target behavior (rising up)
6. countdown timer
7. score counter

## Plan

- [ ] create start game window with start button leading to game window
- [ ] create window with game board container
- [ ] create end game window
- [ ] make broccoloon div pair
- [ ] make broccoloon move up the window
- [ ] give the broccoloon (its sub divs) event listeners "click"
- [ ] make balloon vanish on click
- [ ] make broccoli fall down after vanish of balloon
- [ ] make broccoli stop on the ground and stay there
- [ ] create multiple broccoloons
- [ ] let multiple broccoloons appear randomly: time and location
- [ ] limit broccoloons location to window size
- [ ] change mouse cursor to aiming cross
- [ ] make a countdown timer and show on screen
- [ ] change game window to end window when countdown finished
- [ ] make a score counter, increasing when hit a balloon and show on screen

- [ ] (extra) change div blocks to images; background image
- [ ] (extra) score counter decreasing when hit a broccoli 
- [ ] (extra) let multiple broccoloons appear randomly: size
- [ ] (extra) include sounds
- [ ] (extra) include reloading mechanism (shot counter, delay)
- [ ] (extra) show available darts on screen
- [ ] (extra) make broccoloons wiggle left and right on their way up