import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { Settings } from '../../Settings';
import { PubSubHelper } from '../../utils/AWSIoTPubSub';


export type RemoteCommand = "GET_STATE" | "TAKE_PICTURE" | "START_LOGGING"

const paramSettings = (command: RemoteCommand) => {
  switch (command) {
    case "GET_STATE":
      return (
        <div>Get State</div>
      )
    case "TAKE_PICTURE":
      return (
        <div>Take Picture</div>
      )
    case "START_LOGGING":
      return (
        <div>Start Logging</div>
      )
  }
}

interface Props {};

const CommandExecution: React.FC<Props> = (props: Props) => {
  const [command, setCommand] = React.useState<RemoteCommand>("GET_STATE");

  const executeCommand = () => {
    PubSubHelper.publish(
      Settings.AWS_IOT_COMMAND_TOPIC_NAME,
      // JSON.stringify({'message': 'hello'})
      {'message': 'hello'}
    );
    console.log('published')
  }

  return (
    <div>
      <FormControl>
        <InputLabel id="remote-command-label" sx={{backgroundColor: "primary.light", color: "secondary.main"}}>Remote Command</InputLabel>
        <Select
          labelId="remote-command-label"
          id="remote-command-select"
          value={command}
          label="Remote Command"
          color="secondary"
          // variant="outlined"
          sx={{backgroundColor: "primary.light", color: "secondary.dark", width: 200}}
          onChange={(e: SelectChangeEvent) => {setCommand(e.target.value as any)}}
        >
          <MenuItem value={"GET_STATE"} >1.GET STATE</MenuItem>
          <MenuItem value={"TAKE_PICTURE"}>2.TAKE PICTURE</MenuItem>
          <MenuItem value={"START_LOGGING"}>3.START LOGGING</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="secondary" onClick={executeCommand}>実行</Button>
      {paramSettings(command)}
    </div>
  )
};

export default CommandExecution;
