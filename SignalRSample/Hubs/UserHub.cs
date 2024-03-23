using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
	public class UserHub : Hub
	{
		public static int TotalViews { get; set; }

		public static int TotalUsers { get; set; }


		public override Task OnConnectedAsync()
		{
			TotalUsers++;
			Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
			return base.OnConnectedAsync();
		}

		public override Task OnDisconnectedAsync(Exception? exception)
		{
			TotalUsers--;
			Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
			return base.OnDisconnectedAsync(exception);
		}

		public async Task<string> NewWindowLoaded()
		{
			TotalViews++;
			//send update to all client that the total views has been updated
			await Clients.All.SendAsync("updateTotalViews", TotalViews);
			return $"total view  {TotalViews}";
		}


	}
}
