Lights Out Design Notes

Components:
App (highest level)
< GameBoard/>

GameBoard [parent component]
- Props
 -number of cells? (these will fill up array with on/off (true/false) values to represent being lit up or not)
  - Rows- how many arrays
  - Columns - how many cells in each array


- Has state
  - Each cell and it's light state (on/off)
    [[false, false, false, false, false]
    [false, false, false, false, false]
    [false, false, false, false, false]]
  - State off/false initially for all cells

- Functions
  - updateLight: updates state of cells/lights
    - Logic to update the state of clicked light and applicable neighbor lights

- Pass down to child component as a prop
 - updateLight
 -value of light

 - <Light
    updateLight= {updateLight}
    value={value}
    />

Light [child component]
- Props
  - updateLight
  -value light

-Each light cell is a button: handle clicks here in child component

updateLights gets invoked when cell is clicked and then will update the state in the parent component


   [f, f, f, f, f, f]
   [f, f, f, f, f, f]
   [f, f, f, f, f, f]
   [f, f, f, f, f, f]
   [f, f, f, f, f, f]
   [f, f, f, f, f, f]

   x=2
   y=3

   coord = 3-2



