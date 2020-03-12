const html = require("html-template-tag");

module.exports = ({
	name,
	pkgVersion,
	icon,
	buildTime,
	ip,
	registry,
	list = []
}) => {
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
				<link rel="icon" href="${icon}" />
				<title>${name}</title>
			</head>
			<body>
				<div class="container-md" style="position:relative">
					<a
						class=" px-1 mx-1 py-3 my-n2"
						href="https://github.com/RichieChoo/package-version-plugin"
						target="_blank"
						style="position:absolute;right:0"
						rel="noopener"
						aria-label="GitHub"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="36"
							height="36"
							class="navbar-nav-svg"
							viewBox="0 0 512 499.36"
							role="img"
						>
							<title>GitHub</title>
							<path
								fill="currentColor"
								fill-rule="evenodd"
								d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"
							></path>
						</svg>
					</a>
					<blockquote
						class="blockquote  text-left"
						style="padding: 20px 0; font-size:40px;"
					>
						<p class="mb-0 font-weight-bold">
							${name}
						</p>
						<footer
							class="blockquote-footer"
							style="display:${buildTime
								? "inline-block"
								: "none"};font-size:20px"
						>
							<cite style="">Build Time : ${buildTime} ( IP : ${ip} ) </cite>
						</footer>
						<br />
						<footer
							class="blockquote-footer"
							style="display:${registry
								? "inline-block"
								: "none"};font-size:20px"
						>
							<cite style=""
								>Npm Registry :
								<a target="_blank" href="${registry}">${registry}</a>
							</cite>
						</footer>
					</blockquote>

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
					<p class="text-center">
						Copyright©2020 Created by
						<a
							target="_blank"
							href="https://github.com/RichieChoo/package-version-plugin"
							><cite>package-version-plugin @ ${pkgVersion}</cite></a
						>
					</p>
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
