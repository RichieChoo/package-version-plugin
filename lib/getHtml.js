const html = require("html-template-tag");

module.exports = ({ name, registry, list = [] }) => {
	return html`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<!-- Required meta tags -->
				<meta charset="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>

				<!-- Bootstrap CSS -->
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css"
					integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
					crossorigin="anonymous"
				/>

				<title>${name}</title>
			</head>
			<body>
				<div class="container-md">
					<h1 style="padding: 20px 0;">
						${name}
					</h1>
					<p><a target="_blank" href="${registry}">NPM : ${registry}</a></p>
					<br />
					<table class="table table-striped table-hover">
						<thead class=".thead-dark">
							<tr>
								<th scope="col">#</th>
								<th scope="col">PackageName</th>
								<th scope="col">ExactVersion</th>
								<th scope="col">BelongTo</th>
							</tr>
						</thead>
						<tbody>
							${list.map(
								(v, p) => html`
									<tr>
										<th scope="row">${p + 1}</th>
										<td><a target="_blank" href="${v.href}">${v.name}</a></td>
										<td>${v.version}</td>
										<td>${v.belong}</td>
									</tr>
								`
							)}
						</tbody>
					</table>
				</div>
				<script src="https://cdn.bootcss.com/moment.js/2.20.1/moment.min.js"></script>
				<script
					src="https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.slim.min.js"
					integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
					crossorigin="anonymous"
				></script>
				<script
					src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
					integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
					crossorigin="anonymous"
				></script>
				<script
					src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js"
					integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
					crossorigin="anonymous"
				></script>
			</body>
		</html>
	`;
};
