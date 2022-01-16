import Header from '../../components/Header';
import { BodyDiv, ContentDiv, H3 } from '../../styles/body.style';
import { NextPage, NextPageContext } from 'next';
import { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Chip,
  MenuItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
} from '@mui/material';
import {
  Protocol,
  Region,
  ResponseNgrokConfigProps,
  ResponseNgrokTunnelProps,
} from 'dto';
import { CreateNgrokTunnelDto } from '../../dto/create-ngrok-tunnel.dto';
import { UpdateNgrokTunnelDto } from '../../dto/update-ngrok-tunnel.dto';

type IndexContext = NextPageContext & {
  query: ResponseNgrokTunnelProps & ResponseNgrokConfigProps;
};

const Connections: NextPage<
  ResponseNgrokTunnelProps & ResponseNgrokConfigProps
> = ({ tunnels, configs }) => {
  const [updateConfigs, setUpdateConfigs] = useState({});
  const [addConnection, setAddConnection] = useState(
    new CreateNgrokTunnelDto(),
  );
  const [manageConnectionId, setManageConnectionId] = useState(0);
  const [manageConnection, setManageConnection] = useState(
    new UpdateNgrokTunnelDto(),
  );
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openConfigModal, setOpenConfigModal] = useState(false);
  const onClickUpdateConfig = () => {
    Promise.all(
      Object.keys(updateConfigs).map((key) =>
        fetch('/ngrok-tunnel/config/' + key, {
          method: 'PATCH',
          body: JSON.stringify({ value: updateConfigs[key] }),
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      ),
    )
      .catch(() => alert('Error'))
      .then(() => window.location.reload());
  };
  const onClickUpdateConnection = () => {
    if (!openUpdateModal && manageConnectionId !== 0) {
      setOpenUpdateModal(!openUpdateModal);
    }
    if (openUpdateModal === true && manageConnectionId !== 0) {
      fetch('/ngrok-tunnel/' + manageConnectionId, {
        method: 'PATCH',
        body: JSON.stringify(manageConnection),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .catch(() => alert('Error'))
        .then(() => window.location.reload());
    }
  };
  const onChangeManageConnectionId = (id: number) => {
    setManageConnectionId(id);
    const response = tunnels.find((v) => v.id === id);
    setManageConnection(new UpdateNgrokTunnelDto(response));
  };
  const onChangeManageConnection = (key: string, value) => {
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    const connection = { ...manageConnection };
    connection[key] = value;
    return setManageConnection(connection);
  };
  const onChangeAddConnection = (key: string, value) => {
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    return setAddConnection({ ...addConnection, [key]: value });
  };
  const createNgrokTunnel = () => {
    fetch('/ngrok-tunnel', {
      method: 'POST',
      body: JSON.stringify(addConnection),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch(() => alert('Error'))
      .then(() => window.location.reload());
  };
  const deleteNgrokTunnel = () => {
    if (manageConnectionId !== 0) {
      fetch('/ngrok-tunnel/' + manageConnectionId, { method: 'DELETE' })
        .catch(() => alert('Error'))
        .then(() => window.location.reload());
    }
  };
  const modifyConnectionStatus = (type: string) => {
    switch (type) {
      case 'stop':
        if (manageConnectionId !== 0) {
          fetch('/ngrok-tunnel/status/' + manageConnectionId, {
            method: 'DELETE',
          })
            .catch(() => alert('Error'))
            .then(() => window.location.reload());
        }
        break;
      case 'stop_all':
        fetch('/ngrok-tunnel/status', {
          method: 'DELETE',
        })
          .catch(() => alert('Error'))
          .then(() => window.location.reload());
        break;
      case 'start':
        if (manageConnectionId !== 0) {
          fetch('/ngrok-tunnel/status/' + manageConnectionId, {
            method: 'GET',
          })
            .catch(() => alert('Error'))
            .then(() => window.location.reload());
        }
        break;
      case 'start_all':
        fetch('/ngrok-tunnel/status', {
          method: 'GET',
        })
          .catch(() => alert('Error'))
          .then(() => window.location.reload());
        break;
    }
  };
  return (
    <>
      <Header />
      <BodyDiv>
        <Modal open={openConfigModal} onClose={() => setOpenConfigModal(false)}>
          <Card
            sx={{
              border: 0,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              p: 4,
              minWidth: '80%',
              textAlign: 'right',
            }}
          >
            <Card elevation={0} sx={{ mb: 2, pt: 2 }}>
              {configs.map((config) => (
                <TextField
                  key={config.key}
                  fullWidth
                  size={'small'}
                  variant={'outlined'}
                  label={config.key}
                  placeholder={config.value}
                  value={updateConfigs[config.key]}
                  onChange={(e) =>
                    setUpdateConfigs({
                      ...updateConfigs,
                      [config.key]: e.target.value,
                    })
                  }
                />
              ))}
            </Card>
            <Button onClick={onClickUpdateConfig} variant={'contained'}>
              UPDATE
            </Button>
          </Card>
        </Modal>
        <Modal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
          <Card
            sx={{
              border: 0,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              p: 4,
              minWidth: '80%',
            }}
          >
            <Box
              component="form"
              sx={{
                display: 'grid',
                gridTemplateColumns: useMediaQuery('(min-width:1024px)')
                  ? 'repeat(3, 1fr)'
                  : 'repeat(2, 1fr)',
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                size={'small'}
                value={manageConnection.name}
                onChange={(e) =>
                  onChangeManageConnection('name', e.target.value)
                }
                variant={'outlined'}
                placeholder={'my connection'}
                required
                label={'Name'}
              />
              <TextField
                fullWidth
                size={'small'}
                value={manageConnection.destAddr}
                onChange={(e) =>
                  onChangeManageConnection('destAddr', e.target.value)
                }
                placeholder={'127.0.0.1:80 / 80'}
                variant={'outlined'}
                required
                label={'Destination Addr'}
              />
              <TextField
                fullWidth
                size={'small'}
                select
                label={'Protocol'}
                value={manageConnection.proto}
                onChange={(e) =>
                  onChangeManageConnection('proto', String(e.target.value))
                }
              >
                {Object.keys(Protocol).map((v) => (
                  <MenuItem key={v} value={Protocol[v]}>
                    {v}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                size={'small'}
                select
                label={'Region'}
                value={manageConnection.region}
                onChange={(e) =>
                  onChangeManageConnection('region', String(e.target.value))
                }
              >
                {Object.keys(Region).map((v) => (
                  <MenuItem key={v} value={Region[v]}>
                    {v}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                size={'small'}
                select
                label={'Enable'}
                value={manageConnection.enabled ? 'true' : 'false'}
                onChange={(e) =>
                  onChangeManageConnection('enabled', String(e.target.value))
                }
              >
                <MenuItem value={'true'}>Enable</MenuItem>
                <MenuItem value={'false'}>Disable</MenuItem>
              </TextField>
              <Button
                size={'small'}
                variant="contained"
                onClick={onClickUpdateConnection}
                disabled={!manageConnection.name || !manageConnection.destAddr}
                fullWidth
              >
                UPDATE
              </Button>
            </Box>
          </Card>
        </Modal>
        <ContentDiv>
          <h2>Ngrok Tunnels</h2>
          <Chip
            label="Configuration"
            variant="outlined"
            onClick={() => setOpenConfigModal(true)}
          />
          <H3>Stored Connections</H3>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Protocol</TableCell>
                  <TableCell>DestAddr</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>RemoteAddr</TableCell>
                  <TableCell>Enabled</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tunnels.map((v, i) => (
                  <TableRow key={i}>
                    <TableCell>{v.id}</TableCell>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.proto}</TableCell>
                    <TableCell>{v.destAddr}</TableCell>
                    <TableCell>{v.region}</TableCell>
                    <TableCell>{v.remoteAddr}</TableCell>
                    <TableCell>{v.enabled ? 'Enabled' : 'Disabled'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ContentDiv>
        <ContentDiv>
          <H3>Manage Existing Connection</H3>
          <Box
            component="form"
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              size={'small'}
              select
              label={'Connection ID'}
              value={manageConnectionId}
              onChange={(e) =>
                onChangeManageConnectionId(Number(e.target.value))
              }
            >
              {tunnels.map((tunnel) => (
                <MenuItem key={tunnel.name} value={tunnel.id}>
                  {tunnel.id} ( {tunnel.name} / {tunnel.destAddr} )
                </MenuItem>
              ))}
            </TextField>
            <ButtonGroup fullWidth variant="contained">
              <Button color={'error'} onClick={deleteNgrokTunnel}>
                Delete
              </Button>
              <Button onClick={onClickUpdateConnection}>Update</Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ mt: 2 }}>
            <ButtonGroup fullWidth variant={'outlined'}>
              <Button
                color={'warning'}
                onClick={() => modifyConnectionStatus('stop')}
              >
                Stop
              </Button>
              <Button
                color={'error'}
                onClick={() => modifyConnectionStatus('stop_all')}
              >
                All
              </Button>
              <Button onClick={() => modifyConnectionStatus('start')}>
                Start
              </Button>
              <Button onClick={() => modifyConnectionStatus('start_all')}>
                Without Disabled
              </Button>
            </ButtonGroup>
          </Box>
        </ContentDiv>
        <ContentDiv>
          <H3>Add Connection</H3>
          <Box
            component="form"
            sx={{
              display: 'grid',
              gridTemplateColumns: useMediaQuery('(min-width:1024px)')
                ? 'repeat(3, 1fr)'
                : 'repeat(2, 1fr)',
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              size={'small'}
              value={addConnection.name}
              onChange={(e) => onChangeAddConnection('name', e.target.value)}
              variant={'outlined'}
              placeholder={'my connection'}
              required
              label={'Name'}
            />
            <TextField
              fullWidth
              size={'small'}
              value={addConnection.destAddr}
              onChange={(e) =>
                onChangeAddConnection('destAddr', e.target.value)
              }
              placeholder={'127.0.0.1:80 / 80'}
              variant={'outlined'}
              required
              label={'Destination Addr'}
            />
            <TextField
              fullWidth
              size={'small'}
              select
              label={'Protocol'}
              value={addConnection.proto}
              onChange={(e) =>
                onChangeAddConnection('proto', String(e.target.value))
              }
            >
              {Object.keys(Protocol).map((v) => (
                <MenuItem key={v} value={Protocol[v]}>
                  {v}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              size={'small'}
              select
              label={'Region'}
              value={addConnection.region}
              onChange={(e) =>
                onChangeAddConnection('region', String(e.target.value))
              }
            >
              {Object.keys(Region).map((v) => (
                <MenuItem key={v} value={Region[v]}>
                  {v}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              size={'small'}
              select
              label={'Enable'}
              value={addConnection.enabled ? 'true' : 'false'}
              onChange={(e) =>
                onChangeAddConnection('enabled', String(e.target.value))
              }
            >
              <MenuItem value={'true'}>Enable</MenuItem>
              <MenuItem value={'false'}>Disable</MenuItem>
            </TextField>
            <Button
              size={'small'}
              variant="contained"
              onClick={createNgrokTunnel}
              disabled={!addConnection.name || !addConnection.destAddr}
              fullWidth
            >
              Create
            </Button>
          </Box>
        </ContentDiv>
      </BodyDiv>
    </>
  );
};

Connections.getInitialProps = (ctx: IndexContext) => {
  return ctx.query;
};

export default Connections;
