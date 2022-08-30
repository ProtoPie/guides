
## :hammer_and_wrench: Build

1. Run `npm run build` in the folder *packages/react-guides*;
2. Run `npm run build` in root of the library 'Guides';
3. Check the *dist/guides.js*, if the changes updates; 
3. Install the changed library *react-guides* from *[packages/react-guides](https://github.com/ProtoPie/guides/tree/master/packages/react-guides)* to the *[Guides](https://github.com/ProtoPie/guides/blob/master/package.json)*


### Guides
## :wastebasket: Delete a guide

**We have two ways how to delete a guide:**
1. Select a line and press the button 'Delete';
2. Click on a line and drag to the relative ruler.
# Functions

- `deleteSelectedGuide` - this function is used when a user selected a line and press the 'Delete' button;

```tsx
    public deleteSelectedGuide() {
        // get all active guides
        const guides = this.getGuides();
        // find the index of the guide which the user selected
        const index = guides.findIndex(guide => {
            if(this.state.selectedGuides.includes(guide)){
                return guide;
            }
        });
        // call the event what return the index and value of a deleted guide
        /**
         * When the drag is deleted, the deleteGuide event is called.
         * @memberof Guides
         * @event deleteGuide
         * @param {OnDeleteGuide} - Parameters for the deleteGuide event
         */
        this.props.onDeleteGuide!({
            deletedPosGuide: guides[index],
            deletedIndexGuide: index,
        });
        
        guides.splice(index, 1);
        // push new arrays of guides to the state and clear the array which contains a selected line
        this.setState({
            guides,
            selectedGuides: []
        });
    }
```

# Selected line
When the user selected the line we called function  `selectGuide` and this line changes its color to **![#8169FF](https://via.placeholder.com/15/8169FF/8169FF.png) #8169FF**. And if the user clicks anywhere except the line we call a function `resetSelected` for cleaning the array with selected lines.

## 📝 License

This project is [MIT](https://github.com/daybrush/guides/blob/master/LICENSE) licensed.

```
MIT License

Copyright (c) 2019 Daybrush

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
