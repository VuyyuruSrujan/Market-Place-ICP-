// import { useState } from 'react';
// import { useHoldIc } from "@hold-ic/react";
// // import { md5 } from 'js-md5';
// import { useToast, Spinner } from '@chakra-ui/react';
// import {
//     Button,
//     Input,
//     InputGroup,
//     InputLeftAddon,
//     InputRightElement,
//     Link,
//     Modal,
//     ModalBody,
//     ModalCloseButton,
//     ModalContent,
//     ModalFooter,
//     ModalHeader,
//     ModalOverlay,
//     VStack,
//     useDisclosure
// } from '@chakra-ui/react';

// function WalletButton() {
//     const { holdIC, isConnected } = useHoldIc();
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const [loading, setLoading] = useState(false);
//     const [shortenedUrl, setShortenedUrl] = useState("");
//     const toast = useToast();

//     const connectActor = async () => {
//         const print = await holdIC?.getPrinicpal();
//         console.log({ print });
//         const actor = await holdIC.getActor('backend_backend');
//         console.log({ actor });
//         const a = await actor?.getLink(BigInt(1234));
//         console.log({ a });
//     };

//     const [link, setLink] = useState("");
//     const [longLink, setLongLink] = useState("");

//     const shorten = async () => {
//         setLoading(true);
//         const actor = await holdIC.getActor('backend_backend');
//         const hasher = md5.create();
//         hasher.update(link);
//         console.log({ hasher });
//         const prinicple = await (window as any).ic.plug.getPrincipal();
//         const key = BigInt(`0x${hasher.hex()}`);
//         console.log({ key });
//         const result = await actor?.insert(key, {
//             link: longLink,
//             user: prinicple
//         });
//         setLoading(false);

//         toast({
//             title: 'Completed',
//             description: "Ready to use...",
//             status: 'success',
//             duration: 9000,
//             isClosable: true,
//         });

//         const _shortenedUrl = `https://life-is-short-iota.vercel.app/${link}`;
//         setShortenedUrl(_shortenedUrl);

//         console.log({ result });
//     };

//     const handleConnect = async () => {
//         setLoading(true);
//         await holdIC.connect("Plug", () => {
//             console.log("connected");
//             setLoading(false);
//             toast({
//                 title: 'Successfully Connected',
//                 description: "Ready to use...",
//                 status: 'success',
//                 duration: 9000,
//                 isClosable: true,
//             });
//             onClose();
//         });
//     };

//     return (
//         <>
//             {
//                 isConnected ? (
//                     <>
//                         <Button onClick={() => {
//                             console.log(holdIC.wallet, "wallllett");
//                             holdIC.disconnect(() => console.log("disconnet"));
//                             window.location.reload();
//                             toast({
//                                 title: 'Disconnected',
//                                 description: "Visit Again",
//                                 status: 'info',
//                                 duration: 9000,
//                                 isClosable: true,
//                             });
//                         }}>
//                             Disconnect
//                         </Button>
//                         <Button onClick={async () => {
//                             console.log(holdIC.wallet, "wallet");
//                             await connectActor();
//                         }}>
//                             Get value
//                         </Button>
//                     </>
//                 ) : (
//                     <Button onClick={() => {
//                         console.log(holdIC.wallet, "wallet");
//                         onOpen();
//                     }}>
//                         Wallet Connect
//                     </Button>
//                 )
//             }
//             {
//                 isConnected ? (
//                     <VStack>
//                         <Input size={'lg'} value={longLink} onChange={(e) => setLongLink(e.target.value)} placeholder='Enter Long Link' />
//                         <InputGroup size='sm'>
//                             <InputLeftAddon children='https://life-is-short-iota.vercel.app/' />
//                             <Input placeholder='my short link' value={link} onChange={(e) => setLink(e.target.value)} />
//                             <InputRightElement width='4.5rem'>
//                                 <Button h='1.75rem' size='sm' onClick={shorten}>
//                                     {loading ? (
//                                         <Spinner
//                                             thickness='1px'
//                                             speed='0.65s'
//                                             emptyColor='gray.200'
//                                             color='blue.500'
//                                             size='sm'
//                                         />
//                                     ) : (
//                                         'Shorten'
//                                     )}
//                                 </Button>
//                             </InputRightElement>
//                         </InputGroup>
//                         {shortenedUrl && <Link isExternal href={shortenedUrl}>{shortenedUrl}</Link>}
//                     </VStack>
//                 ) : null
//             }
//             <Modal isOpen={isOpen} onClose={onClose}>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Modal Title</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         <Button onClick={handleConnect}>
//                             {loading ? (
//                                 <Spinner
//                                     thickness='4px'
//                                     speed='0.65s'
//                                     emptyColor='gray.200'
//                                     color='blue.500'
//                                     size='sm'
//                                 />
//                             ) : (
//                                 'Plug Wallet Connect'
//                             )}
//                         </Button>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button colorScheme='blue' mr={3} onClick={onClose}>
//                             Close
//                         </Button>
//                         <Button variant='ghost'>Secondary Action</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     );
// }

// export default WalletButton;
