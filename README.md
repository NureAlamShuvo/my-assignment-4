1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer: (getElementById)--> An element can be identified by a specific id.Always return a single element.
(getElementsByClassName)--> Multiple elements can be found from the same class.Always return a HTMLCollection and you have to access it using the index number.
(querySelector)--> Class, id, tag can all be used.It only return first match element.
(querySelectorAll)--> This method use to CSS selector and select all matching element.It return a NodeList.It can be accessed with a loop.


2. How do you create and insert a new element into the DOM?

Answer: In javascript, document.creatElement() is used to creat a new element and appendChild() is used to add that element to the DOM.


3. What is Event Bubbling? And how does it work?

Answer: Event bubbling is a process where an event starts from a child element and propagates up to its parent elements. For example when a button is clicked, the event flows from the button to div to body and to document.


4. What is Event Delegation in JavaScript? Why is it useful?

Answer: Event delegation means adding an event listener to a parent element to control its child elements.It usefull because it doesn't take many listeners,creat dynamic element and styed clean code.

5. What is the difference between preventDefault() and stopPropagation() methods?

Answer: preventDefault() it stops the default action.
stopPropagation() it stops the event bubbling.