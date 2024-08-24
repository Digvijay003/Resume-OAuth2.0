"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useSession } from 'next-auth/react'
import SignIn from '../components/SignIn'
import { Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Button, Grid, GridItem } from '@chakra-ui/react'
import {Editor, EditorState,ContentState,convertFromRaw, convertFromHTML} from 'draft-js';
import 'draft-js/dist/Draft.css';
import Template1 from '../components/Template1'
import htmlToDraft from "html-to-draftjs";
import ReactDOMServer from 'react-dom/server';



export default function page() {
    const {status}=useSession()

    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

    const handleTemplates = () => {
        const template1JSX = <Template1 />;
        const template1HTML = ReactDOMServer.renderToString(template1JSX);
        const blocksFromHTML = convertFromHTML(template1HTML);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(contentState));
      };


    if(status==='authenticated'){
        return (
            <div>
                <Navbar/>
                <Grid templateColumns='300px 1fr'style={{width:'100vw',paddingTop:'150px'}}>
                    <GridItem>
                        <Button size='md'className='download'marginRight='8px'marginLeft='4px'onClick={handleTemplates}>Template 1</Button>
                        <Button size='md'className='download'>Template 2</Button>

                    </GridItem>
                    <GridItem style={{border:'2px solid black'}}>

                    <Editor editorState={editorState} onChange={setEditorState} />;

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
