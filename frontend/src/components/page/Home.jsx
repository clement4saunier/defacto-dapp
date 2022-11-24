import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../content/Icon";

export default function Home() {
  let navigate = useNavigate();
  const [text] = useState(
    <p>
      DeFacts was designed in an attempt to increase trust in information.<br/><br/>
      No matter the nature of the story, article, publication or newspiece you have, the guarantee that is it true is of great value.<br/><br/>
      Being mis-informed sometimes comes at great cost.<br/><br/>
      We aim to bring a Decentralized Information Verification 
      Protocol that provides a wide net of information gatherers to confirm or infirm information in the most unbiased way.
      The platform incentivises journalistic work of all sorts (fact-checking, data research..) by pairing up three types of profiles and creating
      a collaborative work dynamic between them.
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
        <li>The <strong>Fact-Checker</strong>. His role represents the most of the work, he will investigate to found if yes or not the 
        information is real/fake. Let's suppose that a request was posted, the fact-checker have the possibility to choose if he wants 
        to verify it and he will communicate his report with the most sources as possible before the end of the timer. Anybody can be a Fact-Checker, without any restrictions.</li>
        <li>The <strong>Deleguate</strong>. If the fact-checker will provide most of the works it's the delegate who has the most 
        tricky part, he will validates or not if the fact-checker is right or if it is a bad report. When the deleguate prononces the 
        result the bounty is automatically share between the fact-checker and the delegaute.
        </li>
      </ul>
    </>
  );
}
