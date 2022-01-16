import { NextPage, NextPageContext } from 'next';
import { ResponseLoggerProps } from 'dto';
import Header from '../../components/Header';
import { BodyDiv, ContentDiv, H3 } from '../../styles/body.style';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';

type LogsContext = NextPageContext & {
  query: ResponseLoggerProps & { pathname: string };
};

const Logs: NextPage<ResponseLoggerProps & { pathname: string }> = ({
  logs,
  length,
  pathname,
}) => {
  const [pageInput, setPageInput] = useState(1);
  const page = parseInt(pathname.split('/').pop(), 10);
  return (
    <>
      <Header />
      <BodyDiv>
        <ContentDiv>
          <h2>Logger</h2>
          <H3>Logs Viewer</H3>
          <form action={String(pageInput)} method={'get'}>
            <p>
              Total: {length} rows{' '}
              <input
                onChange={(e) => setPageInput(Number(e.target.value))}
                type="number"
                min={1}
                style={{ width: '48px' }}
                defaultValue={page}
              />{' '}
              /{Math.ceil(length / 29)} page
            </p>
          </form>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>IsError</TableCell>
                  <TableCell>Context</TableCell>
                  <TableCell>JobTag</TableCell>
                  <TableCell>TargetTag</TableCell>
                  <TableCell>ConnectionID</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Stack</TableCell>
                  <TableCell>CreatedAt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((v, i) => (
                  <TableRow key={i}>
                    <TableCell>{v.id}</TableCell>
                    <TableCell>{v.isError ? 'Error' : 'Normal'}</TableCell>
                    <TableCell>{v.context}</TableCell>
                    <TableCell>{v.jobTag}</TableCell>
                    <TableCell>{v.targetTag}</TableCell>
                    <TableCell>{v.connectionId}</TableCell>
                    <TableCell>{v.message}</TableCell>
                    <TableCell>{v.stack}</TableCell>
                    <TableCell>{v.createdAt.toString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ContentDiv>
      </BodyDiv>
    </>
  );
};

Logs.getInitialProps = (context: LogsContext) => {
  return { ...context.query, pathname: context.req.url };
};

export default Logs;
