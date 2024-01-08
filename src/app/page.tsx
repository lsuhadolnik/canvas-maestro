import Image from 'next/image'
import {Editor} from './Editor/Editor';
import Head from 'next/head';

export default function Home() {


  return (
    <>
      <Head key={'pagePage'}>
        <title>Code Editor</title>
        <meta name="description" content="Code Editor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Editor />
    </>
    
  );
}
