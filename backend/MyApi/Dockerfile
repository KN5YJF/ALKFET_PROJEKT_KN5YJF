FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Itt a trükk: minden fájlt átmásolunk a környezetből a munkakönyvtárba
COPY . . 

# Restore és Publish
RUN dotnet restore "MyApi.csproj"
RUN dotnet publish "MyApi.csproj" -c Release -o /app/out

# Futtató környezet
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "MyApi.dll"]