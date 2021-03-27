import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../../Components/Layout";
import { withMyApollo } from "../../Utils/withMyApollo";

const TermsOfService = ({}) => {
  return (
    <Layout title="Terms of Service – Ferman" size="xl">
      <Box>
        <Heading mb={6} color="mainDarkBlue">
          Terms and Conditions of Use
        </Heading>
        <Text fontSize={24}>1. Terms</Text>
        <Text>
          By accessing this Website, accessible from https://ferman.ga, you are
          agreeing to be bound by these Website Terms and Conditions of Use and
          agree that you are responsible for the agreement with any applicable
          local laws. If you disagree with any of these terms, you are
          prohibited from accessing this site. The materials contained in this
          Website are protected by copyright and trade mark law.
        </Text>
        <Text fontSize={24} mt={4}>
          2. Use License
        </Text>
        <Text>
          Permission is granted to temporarily download one copy of the
          materials on Ferman's Website for personal, non-commercial transitory
          viewing only. This is the grant of a license, not a transfer of title,
          and under this license you may not:
        </Text>
        <UnorderedList fontSize={14} my={4}>
          <ListItem>modify or copy the materials;</ListItem>
          <ListItem>
            use the materials for any commercial purpose or for any public
            display;
          </ListItem>
          <ListItem>
            attempt to reverse engineer any software contained on Ferman's
            Website;
          </ListItem>
          <ListItem>
            remove any copyright or other proprietary notations from the
            materials; or
          </ListItem>
          <ListItem>
            transferring the materials to another person or "mirror" the
            materials on any other server.
          </ListItem>
        </UnorderedList>
        <Text>
          This will let Ferman to terminate upon violations of any of these
          restrictions. Upon termination, your viewing right will also be
          terminated and you should destroy any downloaded materials in your
          possession whether it is printed or electronic format. .
        </Text>
        <Text fontSize={24} mt={4}>
          3. Disclaimer
        </Text>
        <Text>
          All the materials on Ferman’s Website are provided "as is". Ferman
          makes no warranties, may it be expressed or implied, therefore negates
          all other warranties. Furthermore, Ferman does not make any
          representations concerning the accuracy or reliability of the use of
          the materials on its Website or otherwise relating to such materials
          or any sites linked to this Website.
        </Text>
        <Text fontSize={24} mt={4}>
          4. Limitations
        </Text>
        <Text>
          Ferman or its suppliers will not be hold accountable for any damages
          that will arise with the use or inability to use the materials on
          Ferman’s Website, even if Ferman or an authorize representative of
          this Website has been notified, orally or written, of the possibility
          of such damage. Some jurisdiction does not allow limitations on
          implied warranties or limitations of liability for incidental damages,
          these limitations may not apply to you.
        </Text>
        <Text fontSize={24} mt={4}>
          5. Revisions and Errata
        </Text>
        <Text>
          The materials appearing on Ferman’s Website may include technical,
          typographical, or photographic errors. Ferman will not promise that
          any of the materials in this Website are accurate, complete, or
          current. Ferman may change the materials contained on its Website at
          any time without notice. Ferman does not make any commitment to update
          the materials.
        </Text>
        <Text fontSize={24} mt={4}>
          6. Links
        </Text>
        <Text>
          Ferman has not reviewed all of the sites linked to its Website and is
          not responsible for the contents of any such linked site. The presence
          of any link does not imply endorsement by Ferman of the site. The use
          of any linked website is at the user’s own risk.
        </Text>
        <Text fontSize={24} mt={4}>
          7. Site Terms of Use Modifications
        </Text>
        <Text>
          Ferman may revise these Terms of Use for its Website at any time
          without prior notice. By using this Website, you are agreeing to be
          bound by the current version of these Terms and Conditions of Use.
        </Text>
        {/* <Text fontSize={24} mt={4}>
          8. Your Privacy
        </Text> */}
        <Text>Please read our Privacy Policy.</Text>
        <Text fontSize={24} mt={4}>
          8. Governing Law
        </Text>
        <Text>
          Any claim related to Ferman's Website shall be governed by the laws of
          gr without regards to its conflict of law provisions.
        </Text>
      </Box>
    </Layout>
  );
};

export default withMyApollo({ ssr: false })(TermsOfService);
