import React from "react";
import { NavLink } from "react-router-dom";

function home() {
	return (
		<div className="home"><div class="container"><div class="row align-items-center my-5">
			<div class="col-lg-7">
				<a href="https://jambit.com/site/assets/files/15736/jambit-stuttgart-office-buero.-widemedium.jpeg">
					<img class="img-fluid rounded mb-4 mb-lg-0" src="./jambit-stuttgart.jpeg" alt=" "/>
				</a>
			</div>
			<div class="col-lg-5">
				<h1 class="font-weight-light">Home</h1><br />
				<p>
					Dies ist ein Tool zur Auswertung von Zufriedenheitsdaten der Mitarbeiter bei der <a href="https://jambit.com">jambit GmbH</a>. Eine genaue Analyse der Daten in einer spezifischen Woche ist <NavLink to="/week">hier</NavLink> möglich, die Entwicklung der Zufriedenheitswerte finden Sie <NavLink to="/timeline">hier</NavLink> und die Möglichkeit einer Detailansicht zu einzelnen Mitarbeitern haben Sie <NavLink to="/detail">hier</NavLink>.
				</p>
				<hr />
				<p>
					Dieses Tool wurde vom 21. bis zum 25.2.2022 von Dennis&nbsp;Hentschel, einem BOGY-Praktikanten des <a href="https://csgb.de">Christoph-Schrempf-Gymnasiums Besigheim</a> bei der <a href="https://jambit.com">jambit GmbH</a> (Standort Stuttgart) programmiert und gestaltet.<br />Dankeschön an Kevin und Andreas für die außerordentlich spannnendende Zeit. <br /> <font face="cursive,serif" size="5">Dennis Hentschel</font>
				</p>
			</div>
		</div></div></div>
	);
}

export default home;
