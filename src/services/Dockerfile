# ==================================
# USE A IMAGEM BASE DO .NET 8 PARA API E Monitor
# Expõe a porta 8080 (padrão de containers)
# ==================================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 7100 

# Use a imagem SDK para buildar API e Worker
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# ----------------------------------------------------------
# ----------------------RESTORE E BUILD (Simplificado) ------
# ----------------------------------------------------------
# Copia TUDO (simplificando o cache para rodar rápido agora)
COPY . . 

# Restaura as dependências
RUN dotnet restore "api/api.csproj"
RUN dotnet restore "Monitor/Monitor.csproj"

# Copila a API
RUN dotnet build "api/api.csproj" -c Release -o /app/build
# Compila o Monitor
RUN dotnet build "Monitor/Monitor.csproj" -c Release -o /app/monitor-build


# ----------------------------------------------------------
# ----------------------PUBLISH ----------------------------
# ----------------------------------------------------------
# Publique a API
FROM build AS publish-api
RUN dotnet publish "api/api.csproj" -c Release -o /app/publish

# Publique o Monitor
FROM build AS publish-monitor
RUN dotnet publish "Monitor/Monitor.csproj" -c Release -o /app/monitor-publish

# ----------------------------------------------------------
# ----------------------FINAL ------------------------------
# ----------------------------------------------------------

# Crie a imagem final para API
FROM base AS final-api
WORKDIR /app
COPY --from=publish-api /app/publish .
# Configura o ENTRYPOINT para rodar a API na porta 8080
ENTRYPOINT ["dotnet", "api.dll", "--urls", "http://+:7100"] 


# Crie a imagem final para Monitor
FROM base AS final-monitor
WORKDIR /app
COPY --from=publish-monitor /app/monitor-publish .
ENTRYPOINT ["dotnet", "Monitor.dll"]
