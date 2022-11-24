import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../content/Icon";

export default function Home() {
  let navigate = useNavigate();
  const [text] = useState(
    <p>
      DeFacts was designed in an attempt to increase trust in information.<br/><br/>
      No matter the nature of the story, article, publication or newspiece you have, 
      the guarantee that is it true is of great value.<br/><br/>
      Being mis-informed sometimes comes at great cost.<br/><br/>
      We aim to bring a Decentralized Information Verification Protocol that provides 
      a wide net of information gatherers to confirm or infirm information in the most unbiased way.
      The platform incentivises journalistic work of all sorts (fact-checking, data research..) 
      by pairing up three types of profiles and creating a collaborative work dynamic between them.
      <br/><br/>

      News outlets of all sizes, independent journalists, newsletter writers or any other individual can leverage
      the vast network of the internet by simply offering a bounty of their choice on a data verification or gathering task.


    </p>
  );

  return (
    <>
      <h1>Decentralized fact-checking and data verification platform</h1>
      <p>Verify information in an unbiased and censorship-resistant manner.</p>
      <button onClick={() => navigate('/list')}>List <Icon crypto="send-in"/></button>
      <button onClick={() => navigate('/create')}>Create <Icon crypto="send-in"/></button>
      <h2>What is it about ?</h2>
      {text}
      <h2>How does it work ?</h2>
      <p> There are 3 different roles on the platform.</p>
      <ul>
        <li>The <strong>Requester</strong> will post a request detailing the information to be verified, the bounty offered as a reward for completing the task, the time required to do so, amongst other things. Anybody can be a Requester without any restictions. </li>
        <li>The <strong>Fact-Checker</strong> does the research and investigative work. Bringing pertinent information as a response to an open Request is the mission. 
        Any sources and records relevant to the subject should be brought to light in an attempt to claim part of the bounty. Time is of the essence, as open Requests have a timer running.
        Anybody can be a Fact-Checker, without any restrictions, and get compensated for the work.</li>
        <li>The <strong>Delegate</strong> provides a seal of approval to the response given by a Fact-Checker to a Requester, 
        if the information gathered is relevant and understandeable. Anyone can be a Delegate, with restrictions, to claim part of the bounty.
        The Delegate takes the role of the authority in this three-way transaction and bears the most responsibility, but does little work.
        To have authority, one must have expertise, credentials, or more generally quantifiable qualities relevant to a field.
        </li>
      </ul>
    </>
  );
}
