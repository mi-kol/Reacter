// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  Image
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';


// Require CSS
require('normalize.css');

const images = {
  facebook: require('./assets/facebook.png'),
  netflix: require('./assets/netflix.png'),
  khan: require('./assets/khan.jpg'),
  default: require('./assets/default.PNG'),
  html: require('./assets/html_tie.png'),
  script: require('./assets/script.PNG'),
  call: require('./assets/calling_java.png')

};

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quaternary: '#CECECE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
      >
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            What is React
          </Heading>
          <Text margin="10px 0 0 0" textColor="tertiary" size={6}>
            Who made it
          </Text>
        </Slide>
        <Slide transition={['slide']}>
          <Image margin="0 0 0 40%" src={images.facebook} width={250} />
        </Slide>
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Why was it made
          </Heading>
          <Text margin="10px 0 0 0" textColor="tertiary" size={6}>
            Many reasons
          </Text>
          <List>
            <ListItem>Fast</ListItem>
            <ListItem>Simple</ListItem>
            <ListItem>Scalable</ListItem>
          </List>
        </Slide>
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Why Open Source
          </Heading>
          <List>
            <ListItem>Test and improve</ListItem>
            <ListItem>Hire people who already know it</ListItem>
            <ListItem>Gives Facebook a good rep</ListItem>
            <Text margin="60px 450px">2013</Text>
          </List>
        </Slide>
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            How to use React
          </Heading>
          <Text margin="10px 0 0 0" textColor="tertiary" size={6}>
            examples
          </Text>
        </Slide>
        <Slide transition={['slide']}>
          <Image margin="0 0 0 20%" src={images.facebook} width={250} />
          <Image  margin="-25% 0 0 55%" src={images.khan} width={250} />
          <Image src={images.netflix} width={600} />
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            Focus:
          </Heading>
          <List>
            <ListItem>App.js</ListItem>
            <ListItem>App.css</ListItem>
            <ListItem>index.html</ListItem>
          </List>
        </Slide>
        <Slide
  transition={[
    'fade',
    (transitioning, forward) => {
      const angle = forward ? -180 : 180;
      return {
        transform: `
          translate3d(0%, ${transitioning ? 100 : 0}%, 0)
          rotate(${transitioning ? angle : 0}deg)
        `,
        backgroundColor: transitioning ? '#26afff' : '#000'
      };
    }
  ]}
>
          <Text margin="10px 0 0 0" textColor="tertiary" size={6}>
            App.js
          </Text>
          <Image src={images.default} width={1000} height={400} /> 
        </Slide>
        <Slide>
          <Text margin="10px 0 0 0" textColor="tertiary" size={6}>
            App.js
          </Text>
          <Image src={images.call} width={700} /> 
        </Slide>
        <Slide
  transition={[
    'fade',
    (transitioning, forward) => {
      const angle = forward ? 90 : -180;
      return {
        transform: `
          translate3d(0%, ${transitioning ? 200 : 0}%, 0)
          rotate(${transitioning ? angle : 0}deg)
        `,
        backgroundColor: transitioning ? '#26afff' : '#000'
      };
    }
  ]}
>
          <Text margin="10px 0 0 0" textColor="tertiary" size={6}>
            index.html
          </Text>
          <Image src={images.html} width={1000} /> 
          <Image src={images.script} width={1000} /> 
        </Slide>
      </Deck>
    );
  }
}