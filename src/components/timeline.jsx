import React, {useEffect} from "react"
import * as chart from "chart.js"
import * as tools from "./tools.js"

import {
	Chart as chartjs,
	CategoryScale,
	LinearScale,
	BarElement,
	BarController,
	LineElement,
	LineController,
	PointElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

chartjs.register(
	CategoryScale,
	LinearScale,
	BarElement,
	BarController,
	LineElement,
	LineController,
	PointElement,
	Title,
	Tooltip,
	Legend
);

const data = JSON.parse('[{"date":"2022-W04","moods":[{"mood":4,"name":"Dennis"},{"mood":3,"name":"Kevin"},{"mood":3,"name":"Alexandros"},{"mood":2,"name":"Tobias"},{"mood":0,"name":"Andreas"}]},{"date":"2022-W05","moods":[{"mood":0,"name":"Dennis"},{"mood":0,"name":"Kevin"},{"mood":3,"name":"Alexandros"},{"mood":2,"name":"Tobias"},{"mood":0,"name":"Andreas"}]}]') // Format für die API, am besten "date" als KW darstellen statt als volles Datum

function pickHex(color1, color2, weight){
	var w1 = weight;
	var w2 = 1 - w1;
	var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
		Math.round(color1[1] * w1 + color2[1] * w2),
		Math.round(color1[2] * w1 + color2[2] * w2)];
	return rgb;
}

function index_for_date(date){
	var is_date = (element) => element.date == date
	return data.findIndex(is_date)
}

function Timeline(){
	useEffect(() => {
		render_timeline()
	},[])
	return(
		<div>
			<canvas id="timeline" width="10" height="4" />
		</div>
	);
}

function generate_colours(){
	var colours = []
	for(var i = 4; i <= 5; i++){
		var c = pickHex([0,255,0],[255,0,0], average_mood("2022-W0" + i) / 5)
		colours.push([
			c[0],
			c[1],
			c[2],
			1
		])
	}
	return colours
}

function average_mood(date){
	var i = 0
	var added_mood = 0
	data.indexOf()
	for(i = 0; i < data[index_for_date(date)].moods.length; i++){
		 added_mood += data[index_for_date(date)].moods[i].mood
	}
	return added_mood / i
}

function generate_datasets(){
	
}

function render_timeline(){
	console.log(generate_colours("2022-W05"))
	const ctx = document.getElementById('timeline').getContext('2d');
	const myChart = new chart.Chart(ctx, {
		type: 'line',
		data: {
			labels: ['KW04', 'KW05'],
			datasets: [
				{
					label: 'Entwicklung der Zufriedenheit bei Jambit',
					data: [average_mood("2022-W04"), average_mood("2022-W05")],
					backgroundColor: "blue",
					borderColor: "blue",
					pointBorderColor: generate_colours(),
					pointBackgroundColor: generate_colours(),
					borderWidth: 2,
					pointBorderWidth: 3,
					tension: 0.5
				}
			]
		},
		options: {
			scales: {
				y: {
					beginAtZero: true
				}
			}
		}
	});
}

export default Timeline
