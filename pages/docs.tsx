import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(import('swagger-ui-react'), {ssr: false})

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      info: {
        title: 'BST API Documentation',
        version: '1.0',
        description: 'This is the documentation for the BST API. Requests are limited to 10 per minute. If you need more, contact a developer.',
        contact: {
          name: 'BST Developers',
          url: './docs'
        },
      },
      securityDefinitions: {
        auth: {
          type: 'apiKey',
          name: 'apikey',
          in: 'header'
        }
      },
      security: [
        { auth: [] }
      ]}
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;