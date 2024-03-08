"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useSession } from 'next-auth/react'
import SignIn from '../components/SignIn'
import { Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Button, Grid, GridItem } from '@chakra-ui/react'
import {Editor, EditorState,ContentState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import Template1 from '../components/Template1'
import htmlToDraft from "html-to-draftjs";
import ReactDOMServer from 'react-dom/server';


export default function page() {
    const {status}=useSession()

    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

    const handleTemplates = () => {
        // Render the React component to HTML
        const template1HTML = ReactDOMServer.renderToString(<Template1 />);
        
        // Convert the HTML to Draft.js content
        const blocksFromHTML = htmlToDraft(template1HTML);
        const { contentBlocks, entityMap } = blocksFromHTML;
        
        // Set the Draft.js editor state
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks, entityMap)));
    };



    if(status==='authenticated'){
        return (
            <div>
                <Navbar/>
                <Grid templateColumns='300px 1fr'style={{width:'100vw',paddingTop:'150px'}}>
                    <GridItem>
                        <Button size='md'className='signOut'marginRight='8px'marginLeft='4px'onClick={handleTemplates}>Template 1</Button>
                        <Button size='md'className='signOut'>Template 2</Button>

                    </GridItem>
                    <GridItem style={{border:'2px solid red'}}>

                    <Editor editorState={editorState} onChange={setEditorState}/>;

                    </GridItem>

                </Grid>
        
        
            </div>
          )

    }
    else if (status==='unauthenticated'){
        return <>
        <SignIn/>
        </>
    }
    else if(status==='loading'){
        return <Flex width='100vw'height='100vh'alignItems='center'justify='center'>
    
 
        <Spinner
      thickness='10px'
      speed='0.85s'
      emptyColor='black'
      color='#fd0'
     
      width='130px'
      height='130px'
    />
    
          </Flex>

    }
    

}
