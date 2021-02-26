# sei-project-one
This version of Tetris aims to replicate the flawless gameplay of the original. it is built tusing HTML, CSS and JavaScript. The entirity of the actual gameply is driven by JavaScript. For the rotation of each piece, I tried to adhere to the 'Super Rotation System' - https://tetris.wiki/Super_Rotation_System. Implementing a smooth and consistent rotation system was one of the trickest aspects of this project, however I am pleased with the results and the positive impact they have on the user experience.

The game is driven by a function utilising the SetIntervalTimer method, which moves the active teronimo one row down at each interval, until it besomes 'set.' The inerval time is dynamic, and will decrease as the game progresses. 

I was keen to avoid adding any extra features to the gameplay itself, and instead wanted to concentrate re-styling classic features and building dynamic styling into the game. My design has the game begin with minimal styling - particularly with regards to colour, and for the player's actions to create a unique stlye for each game played. 

The key factors affecting the styling are:
1. the number of tetronimos added to the board 
2. each time a row cleared
3. the number of rotations made
4. the progress through the game

I also wanted to use the number of each shape type cleared to generate small animations, but did not get this completed in time.

I re-interpreted the 'up next' feature, by incorporating it into the page's header. But instead of simply displaying the next piece, I wanted to use the tetronimo colour scheme as a more subtle indicator. The title banner changes colour to the match the next piece coming, I have deliberately not explicitly sign-posted this in the game, in order to reward the players curiosity and observaiton. This colour scheme is also utilised on the opening instructions, again giving a subtle indicaiton of which pieces are due first and next.

The end of the game gives a sumary of the player's game, including a range of different stats, inlcduiing number of tetronims dropped, how many rows were cleared and what the players final score was. Using the JavaScript localStorage method, I also implemented a 'top score' feature. I would consider extending this feature to allow players to store the colour schem they have created during a game.