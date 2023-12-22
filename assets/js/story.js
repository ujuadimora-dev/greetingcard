const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find((node) => node.id === textNodeIndex);
    textElement.innerText = textNode.text;

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    textNode.options.forEach((option) => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    });
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

const textNodes = [
    {
        id: 1,
        text: 'You are patiently waiting for Christmas chicken jollof/fried rice/fried plantain with goat meat pepper soup, and suddenly you sleep off. When you wake up, you find yourself in a strange place, and you see Mother Christmas carrying a bag full of small stones near you.',
        options: [
            {
                text: 'Take the bag from her',
                setState: { stoneBag: true },
                nextText: 2,
            },
            {
                text: 'Leave the bag',
                nextText: 2,
            },
        ],
    },
    {
        id: 2,
        text: 'You look around in search of where you are when you come across Father Christmas with a sword.',
        options: [
            {
                text: 'Trade with Father Christmas for a sword',
                requiredState: (currentState) => currentState.stoneBag,
                setState: { stoneBag: false, sword: true },
                nextText: 3,
            },
            {
                text: 'Trade with Father Christmas for a shield',
                requiredState: (currentState) => currentState.stoneBag,
                setState: { stoneBag: false, shield: true },
                nextText: 3,
            },
            {
                text: 'Ignore Father Christmas',
                nextText: 3,
            },
        ],
    },
    {
        id: 3,
        text: 'After leaving Father Christmas, you stumble upon a garden full of talking apples and peas.',
        options: [
            {
                text: 'Ask the apple to tell you a story about Christmas trees',
                nextText: 4,
            },
            {
                text: 'Ask the peas to tell you a story about the Birth of Christ',
                nextText: 5,
            },
            {
                text: 'Explore the garden',
                nextText: 6,
            },
            {
                text: 'Find a room near the garden',
                nextText: 7,
            },
            {
                text: 'Find some hay in the stable to sleep in',
                nextText: 8,
            },
        ],
    },
    {
        id: 4,
        text: 'While the apple was telling the story, you became tired and hungry. Suddenly, a wild-looking animal tried to attack you from behind with a sword. The apple defended you with its life.',
        options: [
            {
                text: 'Restart',
                nextText: -1,
            },
        ],
    },
    {
        id: 5,
        text: 'The peas start telling you a captivating story about the birth of Christ. As you listen, you feel a sense of warmth and peace.',
        options: [
            {
                text: 'Express gratitude and continue listening',
                nextText: 9,
            },
            {
                text: 'Interrupt and ask about the talking apples',
                nextText: 4, // Go back to the apple story
            },
        ],
    },
    {
        id: 6,
        text: 'As you explore the garden, you discover a hidden path that leads to a magical land filled with colorful lights and decorations. It seems like the perfect place to celebrate Christmas.',
        options: [
            {
                text: 'Join the festive celebration',
                nextText: 10,
            },
            {
                text: 'Continue exploring the garden',
                nextText: 7,
            },
        ],
    },
    {
        id: 7,
        text: 'You find a cozy room near the garden where you can rest. The room is beautifully decorated with Christmas lights, and there\'s a comfortable bed waiting for you.',
        options: [
            {
                text: 'Rest and enjoy the peaceful atmosphere',
                nextText: 11,
            },
            {
                text: 'Leave the room and continue exploring',
                nextText: 6, // Go back to exploring the garden
            },
        ],
    },
    {
        id: 8,
        text: 'You decide to find some hay in the stable to sleep in. The stable is warm and filled with the comforting sound of animals. It feels like a serene Christmas night.',
        options: [
            {
                text: 'Curl up in the hay and sleep',
                nextText: 12,
            },
            {
                text: 'Explore the stable',
                nextText: 13,
            },
        ],
    },
    {
        id: 9,
        text: 'The peas finish their story, and you express gratitude for the enlightening tale. You feel a sense of joy and fulfillment.',
        options: [
            {
                text: 'Explore more of the garden',
                nextText: 6,
            },
            {
                text: 'Head towards the festive celebration',
                nextText: 10,
            },
        ],
    },
    {
        id: 10,
        text: 'You join the festive celebration and immerse yourself in the joyous atmosphere. The magical land is filled with laughter, music, and the spirit of Christmas.',
        options: [
            {
                text: 'Celebrate and enjoy the festivities',
                nextText: 14,
            },
            {
                text: 'Reflect on your Christmas adventure',
                nextText: 15,
            },
        ],
    },
    {
        id: 11,
        text: 'You rest in the cozy room, surrounded by the warmth of Christmas lights. The peaceful atmosphere lulls you into a restful sleep.',
        options: [
            {
                text: 'Wake up and continue your adventure',
                nextText: 6,
            },
            {
                text: 'Reflect on your dreams in the cozy room',
                nextText: 15,
            },
        ],
    },
    {
        id: 12,
        text: 'Curling up in the hay, you feel a sense of comfort and warmth. The stable provides a peaceful environment, and you drift into a serene sleep.',
        options: [
            {
                text: 'Wake up and explore the stable',
                nextText: 13,
            },
            {
                text: 'Reflect on your dreams in the stable',
                nextText: 15,
            },
        ],
    },
    {
        id: 13,
        text: 'As you explore the stable, you encounter friendly animals and witness a magical scene. It\'s a unique Christmas experience that fills your heart with wonder.',
        options: [
            {
                text: 'Celebrate Christmas with the stable animals',
                nextText: 14,
            },
            {
                text: 'Continue exploring the stable',
                nextText: 13,
            },
        ],
    },
    {
        id: 14,
        text: 'You celebrate Christmas with joyous animals and festive decorations. The magical land and its inhabitants make this Christmas unforgettable.',
        options: [
            {
                text: 'Reflect on the magical Christmas experience',
                nextText: 15,
            },
            {
                text: 'Explore more of the magical land',
                nextText: 10,
            },
        ],
    },
    {
        id: 15,
        text: 'As you reflect on your Christmas adventure, you realize the magic of the season is not just in the destination but in the journey itself. You carry the memories of this unique Christmas in your heart.',
        options: [
            {
                text: 'Start a new Christmas adventure',
                nextText: 1,
            },
            {
                text: 'Share your Christmas story with others',
                nextText: 16,
            },
        ],
    },
    {
        id: 16,
        text: 'You decide to share your Christmas story with others, spreading the magic and joy of the season. Your tale becomes a source of inspiration and warmth for those who hear it.',
        options: [
            {
                text: 'Embark on another Christmas adventure',
                nextText: 1,
            },
        ],
    },
];

startGame();
