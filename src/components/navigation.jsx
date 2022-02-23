import React from "react";
import { NavLink } from "react-router-dom";

function navigation() {
	return (
		<div className="navigation">
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="container">
					<NavLink className="navbar-brand" to="/">
						Stimmungsauswertung für Projektleiter
					</NavLink>
					<div>
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<NavLink className="nav-link" to="/">
									Home
									<span className="sr-only">(current)</span>
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/timeline">
									Zeitliche Entwicklung
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/week">
									Wochenansicht
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/detail">
									Mitarbeiter
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default navigation;
